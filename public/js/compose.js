$(function() {
   CKEDITOR.replace('editor',{
           customConfig: '/js/ckeditor_settings/config.js'
   });
   setInterval(function()
   {
     var objEditor = CKEDITOR.instances["editor"];
     document.getElementById('editor').innerText=`${objEditor.getData()}`;
   }, 3000);
     $('#datetimepicker').datetimepicker();
 });
