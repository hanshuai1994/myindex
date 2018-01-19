(function() {
    $(".list-btn").click(function() {
        $(this).parent().toggleClass("active");
        return $(".lists").toggleClass("active");
    });
}).call(this);
