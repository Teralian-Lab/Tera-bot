function validateFormOnSubmit(contact) {
    var form = document.getElementById("contact__form");
    var status = document.getElementById("contact__form-status");
  
    function success() {
      form.reset();
      alert('Vaše zpráva byla úspěšně odeslána. Ozveme se Vám co nejdříve.');
    }

    function error() {
      alert('Omlouváme se, ale došlo k chybě. Vaši zprávu se nepodařilo odeslat.');
    }
  
    reason = "";
    reason += validateName(contact.name);
    reason += validateEmail(contact.email);
    reason += validatePhone(contact.phone);
  
    if (reason.length > 0) {
        // validation ERROR
        return false;
    } else {
        // validation OK
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
        return false;
    }
}

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

function validateName(name) {
    var error = "";

    if (name.value.length == 0) {
        name.classList.add('form__input-error');
        document.getElementById('name-error').innerHTML = "Toto pole je povinné.";
        var error = "1";
    } else {
        name.classList.remove('form__input-error');
        document.getElementById('name-error').innerHTML = '';
    }
    return error;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}

function validateEmail(email) {
    var error = "";
    var temail = trim(email.value);
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

    if (email.value == "") {
        email.classList.add('form__input-error');
        document.getElementById('email-error').innerHTML = "Toto pole je povinné.";
        var error = "2";
    } else if (!emailFilter.test(temail)) {
        email.classList.add('form__input-error');
        document.getElementById('email-error').innerHTML = "Zadejte platný e-mail.";
        var error = "3";
    } else if (email.value.match(illegalChars)) {
        email.classList.add('form__input-error');
        var error = "4";
        document.getElementById('email-error').innerHTML = "E-mail obsahuje nepovolené znaky.";
    } else {
        email.classList.remove('form__input-error');
        document.getElementById('email-error').innerHTML = '';
    }
    return error;
}

function validatePhone(phone) {
    var error = "";
    var stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');

    if (phone.value == "") {
        document.getElementById('phone-error').innerHTML = "Toto pole je povinné.";
        phone.classList.add('form__input-error');
        var error = '6';
    } else if (isNaN(parseInt(stripped))) {
        var error = "5";
        document.getElementById('phone-error').innerHTML = "Telefonní číslo obsahuje nepovolené znaky.";
        phone.classList.add('form__input-error');
    } else if (stripped.length < 9) {
        var error = "6";
        document.getElementById('phone-error').innerHTML = "Telefonní číslo je příliš krátké.";
        phone.classList.add('form__input-error');
    } else {
        phone.classList.remove('form__input-error');
        document.getElementById('phone-error').innerHTML = '';
    }
    return error;
}
