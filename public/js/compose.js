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
     //client side javascript validation
     //to
     $('#Field1').on('focusout',function(){
       let to= $('#Field1').val();
        if(typeof(to)!=='undefined' && to!=='' && isValidEmail(to))
        {
          if(  $("#Field1").hasClass('is-invalid'))
          {
            $("#Field1").toggleClass('is-invalid',false);
            $( "#Field1" ).toggleClass( 'is-valid', true );
          }
          else {
              $( "#Field1" ).toggleClass( 'is-valid', true );
          }
        }
        else {
          if(  $("#Field1").hasClass('is-valid'))
          {
            $("#Field1").toggleClass('is-invalid',true);
            $( "#Field1" ).toggleClass( 'is-valid', false );
          }
          else {
              $( "#Field1" ).toggleClass( 'is-invalid', true );
          }
        }
     });
     //cc
     $('#Field4').on('focusout',function(){
       let cc= $('#Field4').val();
        if(typeof(cc)!=='undefined' && cc!=='')
        {
          let arr=cc.split(',');
          let bool=true;
          for(let i=0;i<arr.length;i++)
          {
            if(!isValidEmail(arr[i]))
            {
              bool=false;
              if(  $("#Field4").hasClass('is-valid'))
              {
                $("#Field4").toggleClass('is-invalid',true);
                $( "#Field4" ).toggleClass( 'is-valid', false );
              }
              else {
                  $( "#Field4" ).toggleClass( 'is-invalid', true );
              }
              $('#errorcc').text(`${arr[i]} is Invalid Email Id`);
              break;
            }
          }
          if(bool && arr.length<=10)
          {
            if(  $("#Field4").hasClass('is-invalid'))
            {
              $("#Field4").toggleClass('is-invalid',false);
              $( "#Field4" ).toggleClass( 'is-valid', true );
            }
            else {
                $( "#Field4" ).toggleClass( 'is-valid', true );
            }
          }
          else if(arr.length<=0){
            if(  $("#Field4").hasClass('is-valid'))
            {
              $("#Field4").toggleClass('is-invalid',true);
              $( "#Field4" ).toggleClass( 'is-valid', false );
            }
            else {
                $( "#Field4" ).toggleClass( 'is-invalid', true );
            }
              $('#errorcc').text(`${cc} is a Invalid Email Id`);
          }
          else if(arr.length>10) {
              $('#errorcc').text('Maximum Length 10 Exceed!!! Try to minimize number of mail');
          }
        }
        else {

          $("#Field4").val('');
           $("#Field4").hasClass('is-valid')?$( "#Field4" ).toggleClass( 'is-valid', false):$( "#Field4" ).toggleClass( 'is-invalid', false);
        }
     });
     //subject
     $('#Field3').on('focusout',function(){
       let sub= $('#Field3').val()
        if(typeof(sub)!=='undefined' && sub!=='')
        {
          if(  $("#Field3").hasClass('is-invalid'))
          {
            $("#Field3").toggleClass('is-invalid',false);
            $( "#Field3" ).toggleClass( 'is-valid', true );
          }
          else {
              $( "#Field3" ).toggleClass( 'is-valid', true );
          }
        }
        else {
          if(  $("#Field3").hasClass('is-valid'))
          {
            $("#Field3").toggleClass('is-invalid',true);
            $( "#Field3" ).toggleClass( 'is-valid', false );
          }
          else {
              $( "#Field3" ).toggleClass( 'is-invalid', true );
          }
        }
     });
     //textarea update
     // $('#editor').on('keyup',function(){
       // let body= $('#editor').val();
       // alert(body);
       //  if(typeof(body)!=='undefined' && body!=='')
       //  {
       //    if(  $("#editor").hasClass('is-invalid'))
       //    {
       //      $("#editor").toggleClass('is-invalid',false);
       //      $( "#editor" ).toggleClass( 'is-valid', true );
       //    }
       //    else {
       //        $( "#editor" ).toggleClass( 'is-valid', true );
       //    }
       //  }
       //  else {
       //    if(  $("#editor").hasClass('is-valid'))
       //    {
       //      $("#editor").toggleClass('is-invalid',true);
       //      $( "#editor" ).toggleClass( 'is-valid', false );
       //    }
       //    else {
       //        $( "#editor" ).toggleClass( 'is-invalid', true );
       //    }
       //  }
     // });
     Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};
     //date time
     $('#start').on('focusout',function(){
       let date= $('#start').val();
        if(typeof(date)!=='undefined' && date!=='')
        {
    if(new Date(date).isValid())
    {
      if(  $("#start").hasClass('is-invalid'))
      {
        $("#start").toggleClass('is-invalid',false);
        $( "#start" ).toggleClass( 'is-valid', true );
      }
      else {
          $( "#start" ).toggleClass( 'is-valid', true );
      }
    }
    else {
      if(  $("#start").hasClass('is-valid'))
      {
        $("#start").toggleClass('is-invalid',true);
        $( "#start" ).toggleClass( 'is-valid', false );
      }
      else {
          $( "#start" ).toggleClass( 'is-invalid', true );
      }
    }
        }
        else {
          $("#start").val('');
           $("#start").hasClass('is-valid')?$( "#start" ).toggleClass( 'is-valid', false):$( "#start" ).toggleClass( 'is-invalid', false);
        }
     });
//return mail is valid
     function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var forms = $('.needs-validation')
  // Loop over them and prevent submission
   var forms = $('form');
forms.submit(function(event){
  let body= $('#editor').val();
  alert('hello');
   if(typeof(body)==='undefined' && body==='')
   {
     if(  $("#editor").hasClass('is-valid'))
     {
       $("#editor").toggleClass('is-invalid',true);
       $( "#editor" ).toggleClass( 'is-valid', false );
     }
     else {
         $( "#editor" ).toggleClass( 'is-invalid', true );
     }
   }
  let invalid=false;
  $('form').find('input').each(function(){
    if(($(this).is( "[type=text]" ) || $( this ).is( "[type=email]" ))&& $(this).prop('required') && (($(this).val())!=='') && $(this).hasClass('is-invalid')){
        invalid=true;
    }
    else if(($(this).is(  "[type=text]" ) || $( this ).is( "[type=email]" )) && !$(this).prop('required') && (($(this).val())!=='') && $(this).hasClass('is-invalid')) {
      invalid=true;
    }
});
$('form').find('textarea').each(function(){
  if($(this).prop('required') && (($(this).val())!=='') && $(this).hasClass('is-invalid')){
      invalid=true;
  }
  else if(!$(this).prop('required') && (($(this).val())!=='')  && $(this).hasClass('is-invalid')) {

    invalid=true;
  }
});
if(invalid)
{
  event.preventDefault();
event.stopPropagation();
}
});
 });
