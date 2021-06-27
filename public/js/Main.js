function direact(str)
{
  if(!window.location.hostname.includes('.com') && window.location.protocol!== 'https:')
		{
setSrc	(window.location.href=window.location.protocol + '//' + window.location.hostname +':'+window.location.port+ `/${str}`);
	 }
	else
	{
			 setSrc(window.location.href=window.location.protocol + '//' + window.location.hostname+ `/${str}`);
	}
}
function setSrc(route)
{
$('iframe').attr('src',route);

}
