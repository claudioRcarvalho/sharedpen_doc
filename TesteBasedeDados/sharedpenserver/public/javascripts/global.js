// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
console.log("ready");
    // Populate the user table on initial page load
    populateTable();
    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    // Add User button click
    $('#btnAddUser').on('click', addUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
        userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.user + '">' + this.user + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.nome + '">' + this.nome + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.contacto + '">' + this.contacto + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.id_role + '">' + this.id_role + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this.id_utilizador + '">Apagar</a></td>';
            tableContent += '</tr>';
        });
        console.log("GET");

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};


// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.user; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.nome);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'user': $('#addUser fieldset input#inputUserName').val(),
            'pass': $('#addUser fieldset input#inputUserPass').val(),
            'nome': $('#addUser fieldset input#inputUserNome').val(),
            'contacto': $('#addUser fieldset input#inputUserContacto').val(),
            'role': $('#addUser fieldset input#inputUserType').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};