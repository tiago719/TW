function func() {
    $("#menu, #logo").find("a").each(function (index, value) {
        var links = this.getAttribute("href").split("/"); 
        var pos = window.location.href.split("/");
        var novo_link = "";
        var cont = 0;
        for (var i = 0; i < pos.length - 4 ; i++) {
            novo_link += "../";
            cont++;
        }
        for (var i = 0; i < links.length; i++) {
            novo_link += links[i] + "/";
        }
        novo_link = novo_link.substring(0, novo_link.length - 1);
        this.setAttribute('href', novo_link);
       // console.log(index + ':' + value + "  :  " + novo_link);
    });
   
}
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            login(xhttp);
        }
    };
    xhttp.open("GET", "../xml.xml", true);
    xhttp.send();
}
function login(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("utilizador");

    var form_user = $("#login input[name=user]").val();
    var form_pass = $("#login input[name=pass]").val();
    console.log(form_user + ":::" + form_pass);
    
    for (i = 0; i < x.length; i++) {
        var xml_user = x[i].getElementsByTagName("user")[0].childNodes[0].nodeValue;
        var xml_pass = x[i].getElementsByTagName("pass")[0].childNodes[0].nodeValue;

        if (form_user.localeCompare(xml_user) == 0 && form_pass.localeCompare(xml_pass) == 0) {
            logar(x[i]);
            //console.log(x[i]);
        }

    }

    //login INCORRETO
    
    
}

function logar(dados) {
    console.log(dados);
    $("#login").css("display", "none");
    $("#logado .nome").append(dados.getElementsByTagName("prim_nome")[0].childNodes[0].nodeValue);
    $("#logado").show();
    var form = "<strong>Primeiro Nome: </strong>" + dados.getElementsByTagName("prim_nome")[0].childNodes[0].nodeValue +
        " <strong>Apelido: </strong>" + dados.getElementsByTagName("ult_nome")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Nome de Utilizador: </strong>" + dados.getElementsByTagName("user")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>E-mail: </strong>" + dados.getElementsByTagName("mail")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Data de Nascimento: </strong>" + dados.getElementsByTagName("data_nas")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Contacto: </strong>" + dados.getElementsByTagName("contato")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Morada: </strong>" + dados.getElementsByTagName("morada")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Localidade: </strong>" + dados.getElementsByTagName("localidade")[0].childNodes[0].nodeValue + "<br>" +
        "<strong>Código Postal: </strong>" + dados.getElementsByTagName("cod_postal")[0].childNodes[0].nodeValue;
    $("#conteudo #texto").html(form);

}

$(document).ready(function () {
    $("#logo img").wrap("<a href=''>");


    //butoes de slide
    $(".cycle-slideshow").mouseenter(function () {
        $(".cycle-slideshow .prev,.next").fadeIn(400);
    })
    .mouseleave(function () {
        $(".cycle-slideshow .prev,.next").fadeOut(400);
    });
    

    $("input[name=motivo]").click(function () {
        if ($('#outras').is(':checked')) {
            $('#outra_questa_ta').show();
        } else {
            $('#outra_questa_ta').hide();
        }
        
    });

    $(".titulo_menu").click(function () {
        
        if ($(document).width() < 870) {
            if ($(".menu").is(":hidden")) {
                $(".menu").slideDown("slow");
            } else {
                $(".menu").slideUp("slow");
            }
            
        }

    });
    $(window).resize(function () {
        if ($(document).width() > 870 && $(".menu").is(":hidden")) { $(".menu").show(); }
        else if ($(document).width() < 870 && $(".menu").is(":visible"))
            $(".menu").slideUp("slow");
    });

});

function mostra(x) {
    $('#form_perguntas').hide();
    $('#form_suporte_produto').hide();
    $("#form_"+x).show();
}

