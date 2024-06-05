<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if (!function_exists('load_assets')) {
    function load_assets() {
        $assets = [
            base_url('public/assets/jquery/dist/jquery.min.js'),
            base_url('public/assets/custom/hello.js')
        ];

        foreach ($assets as $asset) {
            echo "<script src='$asset'></script>";
        }
    }
}
?>
