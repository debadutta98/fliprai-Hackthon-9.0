function direact(str)
{
  if(!window.location.hostname.includes('.com') && window.location.protocol!== 'https:')
		{
setSrc	(window.location.protocol + '//' + window.location.hostname +':'+window.location.port+ `/${str}`);
	 }
	else
	{
			 setSrc(window.location.protocol + '//' + window.location.hostname+ `/${str}`);
	}
}
function setSrc(route)
{
$('#frame1').attr('src',route);
$('#frame1').on('load', function(){
    let iframe=$("#frame1").contents();
    iframe.find('form').attr('action',copy('compose/sendmail'));
    iframe.find('form').attr('method','post');
    iframe.find('form').attr('target','myframe');
});
}
direact('home');
window.onload=function(){
  //get doument inside iframe
  let iframe=$("#frame1").contents();
  iframe.find('form').attr('action',copy('compose/sendmail'));
  iframe.find('form').attr('method','post');
iframe.find('form').attr('target','myframe');
};
function copy(str)
{
  if(!window.location.hostname.includes('.com') && window.location.protocol!== 'https:')
    {
return window.location.protocol + '//' + window.location.hostname +':'+window.location.port+ `/${str}`;
   }
  else
  {
    return   window.location.protocol + '//' + window.location.hostname+ `/${str}`;
  }
}
