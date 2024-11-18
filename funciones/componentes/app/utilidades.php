<?php
    function depurar($data) {
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
    }
    function rutaBase($ruta) {
        return BASE_RUTA.$ruta;
    }
    function formatoURL($url) {
        $url = strtolower(trim($url));
        return preg_replace(["~á~","~é~","~í~","~ó~","~ú~"],["a","e","i","o","u"],$url);
    }
    function formatoTelefono($numero) {
        return str_replace(' ', '',$numero);
    }
    function formatoVcf($vcf) {
        $vcf = str_replace(' ', '', $vcf);
        $vcf = '+'.$vcf;
        return implode("-", str_split($vcf, 4));
    }
    function formatoNumero($vcf) {
        $vcf = '+'.$vcf;
        return implode("-", str_split($vcf, 9));
    }
    function formatoNombre($nombre) {
        return str_replace('-', ' ',$nombre);
    }
    function cifrar($parametro){
        return urlencode(base64_encode($parametro));
    }
    function descifrar($parametro){
        return base64_decode(urldecode($parametro));
    }
?>