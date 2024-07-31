#!/bin/bash
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USERNAME" -d "$DB_DATABASE" -h "$DB_HOST" -c "\copy new_users_data_offiria(user_id, name, username, email, image_file_name, title, gred, division, unit, lokasi, work_phone, ordering, taraf_jawatan, active_status) FROM '$DEPLOY_PATH/intranet-tourism/database/migration_data/new_user_data.csv' DELIMITER ',' CSV HEADER;"
