<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CustomSqlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $sql = "
            CREATE TABLE IF NOT EXISTS new_users_data_offiria (
                id SERIAL PRIMARY KEY,
                user_id INT UNIQUE,
                name VARCHAR(255),
                username VARCHAR(255),
                email VARCHAR(255),
                image_file_name VARCHAR(255),
                title VARCHAR(255),
                gred VARCHAR(255),
                division VARCHAR(255),
                unit VARCHAR(255),
                lokasi VARCHAR(255),
                work_phone VARCHAR(255),
                ordering VARCHAR(255),
                taraf_jawatan VARCHAR(255),
                active_status VARCHAR(255)
            );
            
            COPY new_users_data_offiria(user_id, name, username, email, image_file_name, title, gred, division, unit, lokasi, work_phone, ordering, taraf_jawatan, active_status)
            FROM '" . base_path('database/migration_data/new_user_data.csv') . "'
            DELIMITER ','
            CSV HEADER;
            
            INSERT INTO users (id, email, password, name, \"order\", username, is_active)
            SELECT
                u.user_id,
                u.email,
                'default_password' AS password,
                u.name,
                COALESCE(u.ordering, '0') AS \"order\", 
                u.username,
                CASE
                    WHEN CAST(u.active_status AS INTEGER) = 1 THEN TRUE
                    ELSE FALSE
                END AS is_active 
            FROM
                new_users_data_offiria u
            WHERE
                u.email IS NOT NULL
                AND TRIM(u.email) <> ''
            ON CONFLICT (email) DO NOTHING;
            
            INSERT INTO profiles (user_id, bio, image, work_phone)
            SELECT ud.user_id, ud.name, ud.image_file_name, ud.work_phone 
            FROM new_users_data_offiria ud
            WHERE EXISTS (
                SELECT 1
                FROM users u
                WHERE u.id = ud.user_id
            );
            
            UPDATE profiles p
            SET work_phone = (
                SELECT work_phone
                FROM new_users_data_offiria u
                WHERE u.user_id = p.user_id
                  AND LENGTH(work_phone) = 4
            )
            WHERE EXISTS (
                SELECT 1
                FROM new_users_data_offiria u
                WHERE u.user_id = p.user_id
                  AND LENGTH(work_phone) = 4
            );
            
            INSERT INTO departments (name)
            SELECT DISTINCT division
            FROM new_users_data_offiria
            WHERE division IS NOT NULL;
            
            
            CREATE TEMP TABLE temp_unique_titles AS
            SELECT DISTINCT LOWER(taraf_jawatan) AS unique_title
            FROM new_users_data_offiria
            WHERE taraf_jawatan IS NOT NULL
              AND taraf_jawatan <> '';
            
            INSERT INTO business_posts (title)
            SELECT DISTINCT INITCAP(unique_title) AS title
            FROM temp_unique_titles
            WHERE unique_title NOT IN (
              SELECT LOWER(title)
              FROM business_posts
            );
            
            DROP TABLE temp_unique_titles;
            
            INSERT INTO business_units (department_id, name)
            SELECT DISTINCT d.id AS department_id, u.unit AS name
            FROM new_users_data_offiria u
            JOIN departments d ON u.division = d.name
            WHERE u.unit IS NOT NULL
              AND u.unit <> ''
              AND (d.id, u.unit) NOT IN (
                SELECT department_id, name
                FROM business_units
            );
            
            
            INSERT INTO employment_posts (
                department_id, 
                business_unit_id, 
                business_post_id, 
                business_grade_id, 
                business_scheme_id, 
                user_id, 
                schema_grade, 
                title, 
                location
            )
            SELECT
                d.id AS department_id,
                COALESCE(bu.id, 1) AS business_unit_id,
                COALESCE(bp.id, 1) AS business_post_id,
                1 AS business_grade_id,
                1 AS business_scheme_id,
                u.id AS user_id,
                n.gred AS schema_grade,
                n.title AS title,
                n.lokasi AS location
            FROM
                new_users_data_offiria n
            INNER JOIN
                departments d ON n.division = d.name
            LEFT JOIN
                business_units bu ON d.id = bu.department_id AND n.unit = bu.name
            LEFT JOIN
                business_posts bp ON LOWER(n.taraf_jawatan) = LOWER(bp.title)
            LEFT JOIN
                users u ON n.email = u.email
            WHERE
                n.email IS NOT NULL;
            ";

            // Execute SQL script
            DB::unprepared($sql);
        });
    }
}
