<?php


use \Illuminate\Http\UploadedFile;

if (!function_exists('uploadFile')) {
    function uploadFile(UploadedFile $uploadedFile, $fileName = null, $folder = null, $disk = null)
    {
        $fileRef = [];
        $whitelistExtension = !empty(config('filesystems.whitelist'))
            ? explode(',', config('filesystems.whitelist.criteria.extension'))
            : ["jpg", "jpeg", "png", "bmp", "pdf"];

        $fileRef['extension'] = strtolower($uploadedFile->extension() ?? $uploadedFile->clientExtension());
        $fileRef['mime_type'] = $uploadedFile->getMimeType();
        $fileRef['filesize'] = $uploadedFile->getSize();
        $whitelistExtensionList = collect($whitelistExtension)->map(fn ($ext) => strtoupper($ext))->join(' / ');
        if (!in_array($fileRef['extension'], $whitelistExtension)) abort(422, "Fail berformat " . strtoupper($fileRef['extension']) . " tidak dapat diproses. Sila muat naik fail berformat $whitelistExtensionList sahaja.");

        if (!$uploadedFile->getSize() || $uploadedFile->getSize() >= UploadedFile::getMaxFilesize()) abort(422, "Saiz fail terlalu besar. Sila muat naik fail bersaiz 100MB atau lebih kecil.");

        $fileRef['path'] = $disk ? $uploadedFile->store($folder, $disk) : $uploadedFile->store($folder);
        if (!$fileRef['path']) abort(500, "Gagal memuat naik fail.");
        $fileRef['name'] = empty($fileName) ? pathinfo($fileRef['path'], PATHINFO_FILENAME) : $fileName;

        // !!important: Image optimization required synchronous operation. resources does not exist yet
        // $fileRef['path'] = optimizeImage($fileRef['path']);

        // \App\Jobs\OptimizePdf::dispatch($fileRef['path']);

        return $fileRef;
    }
}
