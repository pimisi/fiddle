//<![CDATA[ 
$(window).load(function(){
$('.panel-heading a').on('click',function(e){
    if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
        e.preventDefault();
        e.stopPropagation();
    }
});
});//]]> 