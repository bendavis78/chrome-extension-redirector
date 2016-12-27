function getRedirects() {
  json = localStorage.getItem('redirects') || '[]'; 
  return JSON.parse(json);
}

function setRedirects(list) {
  localStorage.setItem('redirects', JSON.stringify(list));
  storageUpdate();
}

function add() {
  var $from = $('#from');
  var $to = $('#to');
  if ($from.val() == '') {
    alert('Enter a url pattern', 'error');
    return;
  }
  if ($to.val() == '') {
    alert('Enter a redirect url', 'error');
    return;
  }
  try {
    new RegExp($from.val());
  } catch(err) {
    alert('Error: '+err, 'error');
    return;
  }
  redirects = getRedirects();
  redirects.push([$from.val(), $to.val()]);
  setRedirects(redirects);
  $from.val('');
  $to.val('');
  alert('Redirect added.');
}

function remove() {
  redirects = getRedirects();
  if (!redirects) {
    // something odd happened, trigger storage update.
    storageUpdate();
    return;
  }
  redirects.splice(this.value, 1);
  setRedirects(redirects);
  alert('Redirect removed.');
}

function editHolder(fromInput, toInput) {
  return function edit() {
    redirects = getRedirects();
    if (!redirects) {
      storageUpdate();
      return;
    }
    var from = redirects[this.value][0];
    var to = redirects[this.value][1];
    redirects[this.value][0] = fromInput.val();
    redirects[this.value][1] = toInput.val();
    setRedirects(redirects);
    alert('Redirect edited.');
  }
}

function alert(msg, type) {
  var $alert = $('#alert');
  var timeout;
  type = type || 'success'
  $alert.find('span.msg').html(msg);
  $alert.attr('class', 'alert fade in alert-'+type);
  $alert.show();
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    $alert.slideUp();
  }, 3000);
}

function storageUpdate() {
  var redirects = getRedirects();
  var $tbody = $('#redirects table tbody');
  $tbody.html('');
  $('#redirects').toggle(redirects.length>0);
  for (var i=0; i<redirects.length; i++) {
    addToTable(i, redirects[i][0], redirects[i][1]);
  }
}

function tmpl(id, context) {
  var tmpl = $('#'+id).html()
  for (var v in context) {
    var pattern = '{{'+v+'}}';
    while(tmpl.match(new RegExp(pattern))) {
      tmpl = tmpl.replace(pattern, context[v]);
    }
  }
  return $(tmpl);
}

function addToTable(id, from, to) {
  var $row = tmpl('table_row_tpl', {
    'id': id,
    'from': from,
    'to': to
  });
      
  $row.find('button.remove').on('click', remove);
  $row.find('button.edit').on('click', editHolder(
      $row.find('input.from'),
      $row.find('input.to'))
  );
  $row.appendTo($('#redirects table tbody'));
}


$(document).ready(function(){
  $('#add').on('click', add);
  $('#alert').alert();
  storageUpdate();
});
