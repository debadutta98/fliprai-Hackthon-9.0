$(document).ready(function () {
//
$('#dtBasicExample').DataTable({
  responsive: true,
dom: 'lBfrtip',
language: {
  emptyTable: window.location.href.includes('home')?"No mail is Scheduled":"No Mail has Sent to the recipients"
},
buttons: [
{ extend: 'copy', className: 'btn btn-primary glyphicon glyphicon-duplicate' },
{ extend: 'excel', className: 'btn btn-primary glyphicon glyphicon-list-alt' },
{ extend: 'pdf', className: 'btn btn-primary glyphicon glyphicon-file' },
]});
});
let usermassage;
if (typeof(massages) !== 'undefined') {
if(typeof(massages)==='string')
{
usermassage=JSON.parse(massages);
}
if(typeof(massages)==='object')
{
usermassage=massages;
}
}
if(typeof(usermassage)!=='undefined'){
let chome=0;
let chis=0;
usermassage.mail.forEach(function(value) {
    let n = moment().format(" MM/D/YYYY hh:mm A");
if(usermassage.sign==='>')
{
if(moment(value.massage.sendAt*1000).isAfter(moment(new Date(n.toString()).getTime())))
{

    chome++;
  $(document).find('tbody').append(`<tr>
          <td   align="center">${chome}</td>
          <td   align="center">${'personalizations' in value.massage?value.massage.personalizations[0].subject:value.massage.subject}</td>
          <td   align="center">${covertto(value.massage.sendAt*1000,"LL")}</td>
          <td   align="center">${covertto(value.massage.sendAt*1000,"LT")}</td><td   align="center">${check(value.massage._id,value.status,usermassage.sign)}</td>/tr>`);
}
}
else {
if(moment(value.massage.sendAt*1000).isBefore(moment(new Date(n.toString()).getTime())))
{
    chis++;
  $(document).find('tbody').append(`<tr>
          <td   align="center">${chis}</td>
          <td   align="center">${'personalizations' in value.massage?value.massage.personalizations[0].subject:value.massage.subject}</td>
          <td   align="center">${covertto(value.massage.sendAt*1000,"LL")}</td>
          <td   align="center">${covertto(value.massage.sendAt*1000,"LT")}</td><td   align="center">${check(value.massage._id,value.status,usermassage.sign)}</td>/tr>`);
}
}
});
}
function covertto(second,str)
{
return moment(second).format(str);
}
function check(id,code,sign)
{
if(code===202)
{
  if(sign==='>')
  {
    return `<i class="far fa-clock"  style="color:#FFC947;" title="wait"></i>`
  }
  else {
    return `<i class="far fa-check-circle"  style="color:green;" title="sucessfully send"></i>`
  }
}
else {
return `<i class="far fa-times-circle" style="color:red;" title="not send"></i>`
}
}
function addroute()
{
if(!window.location.hostname.includes('.com') && window.location.protocol!== 'https:')
{
return	window.location.protocol + '//' + window.location.hostname +':'+window.location.port+ `/viewmail`;
}
else
{
return  window.location.protocol + '//' + window.location.hostname+ `/viewmail`;
}
}
if(window.location.href.includes('home'))
{
  $('#pagename').text('Home');
  $('#page').text('See your Scheduled Mails');
}
