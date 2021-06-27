CKEDITOR.replace('editor',{
        customConfig: '/ckeditor_settings/config.js'
});
setInterval(function()
{
  var objEditor = CKEDITOR.instances["editor"];
  document.getElementById('editor').innerText=`${objEditor.getData()}`;
  }
  , 3000);

 $(function() {
     $('#datetimepicker').datetimepicker();
 });
