$(document).ready(function() {

    $('#seed-input-btn').click(() => {

        var seed_data = $("#seed-input").val();
        if (seed_data.length == 0) {
            alert("seed has not been inserted");
        } else {
            location.href = "nameRegistration.html";
        }
    });
});