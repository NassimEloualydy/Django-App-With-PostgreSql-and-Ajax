function switchCnxInscr(data){
    for(i=0;i<document.querySelectorAll(".textInput").length;i++){
        document.querySelectorAll(".textInput")[i].value="";
    }
    if(data==1){
        document.getElementsByClassName('containerForm')[0].style.left="-100%";
    }else{
        document.getElementsByClassName('containerForm')[0].style.left="0";
    }
}
function inscrire(){
    // toastr.success("SVP tout les les champs sont obligatorie","",{positionClass:"toast-bottom-right"});
    var photo=document.getElementById("photoAdmin").files[0];
    var cni=document.getElementById("cniAdmin").value;
    var nom=document.getElementById("nomAdmin").value;
    var prenom=document.getElementById("prenomAdmin").value;
    var email=document.getElementById("emailAdmin").value;
    var pw=document.getElementById("pwAdmin").value;
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    if(document.getElementById("photoAdmin").files.length==1 && cni!="" && nom!="" && prenom!="" && email!="" && pw!=""){
      var f=new FormData();
      f.append("photo",photo);
      f.append("cni",cni);
      f.append("nom",nom);
      f.append("prenom",prenom);
      f.append("email",email);
      f.append("pw",pw);
      f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
        var {type,message}=JSON.parse(this.responseText);
        if(type=="error"){
            toastr.warning(message,"",{positionClass:"toast-bottom-right"});
        }
        if(type=="success"){
            toastr.success(message,"",{positionClass:"toast-bottom-right"});
            switchCnxInscr(1);
        }
        }
      }
      xhr.open("POST","inscrire",false);
      xhr.send(f);
    }else
    toastr.warning("SVP tout les champs sont obligatoire !!","",{positionClass:"toast-bottom-right"});
}
function cnx(){
    var email=document.getElementById("emailCnx").value;
    var pw=document.getElementById("pwCnx").value;
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    if(email!="" && pw!=""){
      var f=new FormData();
      f.append("email",email);
      f.append("pw",pw);
      f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            if(type=="error"){
                toastr.warning(message,"",{positionClass:"toast-bottom-right"});
            }
            if(type=="success"){
                toastr.success(message,"",{positionClass:"toast-bottom-right"});
                switchCnxInscr(2);
                window.location.href="plante";
            }
    
        }
      }
      xhr.open("POST","signIn",false);
      xhr.send(f);
    }else
    toastr.warning("SVP remplire tout les champs","",{positionClass:"toast-bottom-right"})
}
function hideShowMenu(){
    document.getElementById("menu").classList.remove('menu');
    document.getElementById("menu").classList.add('showMenu');
}
function hideMneu(url){
    document.getElementById("menu").classList.remove('showMenu');
    document.getElementById("menu").classList.add('menu');
    window.location.href=url;
}
function showForm(){
document.getElementById("formulaire").classList.remove("formulaire");
document.getElementById("formulaire").classList.add("showFormulaire");
}
function hideFormPlante(){
    document.getElementById("formulaire").classList.add("formulaire");
    document.getElementById("formulaire").classList.remove("showFormulaire");    
    document.getElementById("seriePlante").value="";
    document.getElementById("nomPlante").value="";
    document.getElementById("originePlante").value="";
    document.getElementById("typePlante").value="";
    document.getElementById("prixPlante").value="";
    document.getElementById("submitPlante").value="Ajouter";

}
function submitPlante(){
    var serie=document.getElementById("seriePlante").value;
    var nom=document.getElementById("nomPlante").value;
    var origine=document.getElementById("originePlante").value;
    var type=document.getElementById("typePlante").value;
    var prix=document.getElementById("prixPlante").value;
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if(serie!="" && nom!="" && origine!="" && type!="" && prix!=""){
      if(isFinite(prix)==true){
          var xhr=new XMLHttpRequest();
          xhr.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                var {type,message}=JSON.parse(this.responseText);
                if(type=="error"){
                    toastr.warning(message,"",{positionClass:"toast-bottom-right"});
                }
                if(type=="success"){
                    toastr.success(message,"",{positionClass:"toast-bottom-right"});
                    hideFormPlante();
                    getDataPlante();
                }
                    }
          }
          if(document.getElementById("submitPlante").value=="Ajouter")
          xhr.open("POST","addPlante",false);
          else
          xhr.open("POST","updatePlante",false);
          var f=new FormData();
          f.append("serie",serie);
          f.append("nom",nom);
          f.append("origine",origine);
          f.append("typeP",type);
          f.append("prix",prix);
          f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
          f.append("id",idPlante);
          xhr.send(f);
      }else
      toastr.warning("SVP tout le prix doit etre un chiffre !!","",{positionClass:"toast-bottom-right"});
    }else
    toastr.warning("SVP tout les champs sont obligatoire !!","",{positionClass:"toast-bottom-right"});
}
var offsetPlante=0;
function navDataPlante(data){
    if(data=="nex"){
        offsetPlante=offsetPlante+5;
    } 
    if(data=="pre" && offsetPlante!=0){
        offsetPlante=offsetPlante-5;
    }
    getDataPlante();
}
function getDataPlante(){
    getNbrPlantParType();
 var xhr=new XMLHttpRequest();
 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
        var data=JSON.parse(JSON.parse(this.responseText).data);
        if(data.length>0){
            var strData="";
            for(i=0;i<data.length;i++){
                strData+="<tr><td>"+data[i].fields.serie+"</td><td>"+data[i].fields.nom+"</td><td>"+data[i].fields.origine+"</td><td>"+data[i].fields.typeP+"</td><td>"+data[i].fields.prix+"</td><td><ion-icon onclick='deletePlante("+data[i].pk+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updatePlante("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td></tr>";   
            }
            document.getElementById("listPlante").innerHTML=strData;    
        }else
        offsetPlante=offsetPlante-5;         
    }
 }
 xhr.open("POST","getDataPlante",true);
 var f=new FormData();
 var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
 f.append("offsetPlante",offsetPlante);
 f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
 xhr.send(f);
}
function deletePlante(id){
    if(window.confirm("Voulez vous vraiment supprimer cet plante !!")){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status==200 && this.readyState==4){
             var {type,message}=JSON.parse(this.responseText);
             toastr.success(message,"",{positionClass:"toast-bottom-right"}) 
             getDataPlante();
            }
        }
        xhr.open("POST","deletePlante",true);
        var f=new FormData();
        f.append("id",id);
        var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
        f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
        xhr.send(f);
        
    }
}
function Quiiter(){
    // var xhr=new XMLHttpRequest();
    // xhr.onreadystatechange=function(){
    //     if(this.status==200 && this.readyState==4){

    //     }
    // }
    // xhr.open("POST","Quitter",true);
    // var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    // var f=new FormData();
    // f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    // xhr.send(f);
    window.location.href="/login";

}
var idPlante=0;
function updatePlante(data,id){
// alert(typeof(data));
// alert(id);
var {serie,nom,typeP,prix,origine}=data;
if(serie!=undefined){
    document.getElementById("seriePlante").value=serie;
    document.getElementById("nomPlante").value=nom;
    document.getElementById("originePlante").value=origine;
    document.getElementById("typePlante").value=typeP;
    document.getElementById("prixPlante").value=prix;
    idPlante=id;    
}else{
    idPlante=data[0];
    document.getElementById("seriePlante").value=data[1];
    document.getElementById("nomPlante").value=data[2];
    document.getElementById("originePlante").value=data[3];
    document.getElementById("typePlante").value=data[4];
    document.getElementById("prixPlante").value=data[5];    
}
document.getElementById("submitPlante").value="Moddifier";
showForm();

}
function searchPlante(){
    var serie=document.getElementById("seriePlanteSearch").value;
    var nom=document.getElementById("nomPlanteSearch").value;
    var type=document.getElementById("typePlanteSearch").value;
    var origine=document.getElementById("originePlanteSearch").value;
    var prix=document.getElementById("prixPlanteSearch").value;
   var xhr=new XMLHttpRequest();
   xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
     var data=JSON.parse(this.responseText);
    var strData="";
    for(i=0;i<data.data.length;i++){
        strData+="<tr><td>"+data.data[i][1]+"</td><td>"+data.data[i][2]+"</td><td>"+data.data[i][3]+"</td><td>"+data.data[i][4]+"</td><td>"+data.data[i][5]+"</td><td><ion-icon onclick='deletePlante("+data.data[i][0]+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updatePlante("+JSON.stringify(data.data[i])+","+data.data[i][0]+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td></tr>";   
    }
    document.getElementById("listPlante").innerHTML=strData;

    }
   }
   xhr.open("POST","searchPlante",false);
   var f=new FormData();
   f.append("serie",serie);
   f.append("nom",nom);
   f.append("typeP",type);
   f.append("origine",origine);
   f.append("prix",prix);
   var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
   f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
   xhr.send(f);
    
}
var chartNbrePlanetByType = null; 
var chartNbrePlanetByTypeRedare = null; 

function getNbrPlantParType(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status=200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var dataPlante=new Array();
            var countPlante=new Array();
            for(i=0;i<data.data.length;i++){
                dataPlante.push(data.data[i][0]);
                countPlante.push(data.data[i][1]);
            }

             dataRedar = {
                labels: dataPlante,
                datasets: [
                    {
                  label: 'My First Dataset',
                  data: countPlante,
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  pointBackgroundColor: 'rgb(255, 99, 132)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(255, 99, 132)'
                }
                // , 
                // {
                //   label: 'My Second Dataset',
                //   data: countPlante,
                //   fill: true,
                //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
                //   borderColor: 'rgb(54, 162, 235)',
                //   pointBackgroundColor: 'rgb(54, 162, 235)',
                //   pointBorderColor: '#fff',
                //   pointHoverBackgroundColor: '#fff',
                //   pointHoverBorderColor: 'rgb(54, 162, 235)'
                // }
            ]
              };
              var configRedar = {
                type: 'radar',
                data: dataRedar,
                options: {
                  elements: {
                    line: {
                      borderWidth: 3
                    }
                  }
                },
              };
              if(chartNbrePlanetByTypeRedare!=null){
                chartNbrePlanetByTypeRedare.destroy();
            }
            // document.getElementById('chartNbrePlanetByTypeRedare')
            chartNbrePlanetByTypeRedare = new Chart(document.getElementById("chartNbrePlanetByTypeRedare"),configRedar);
            

            data = {
    labels: dataPlante,
    datasets: [{
      label: 'Nombre de plante par type',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      data: countPlante,
    }]
  };
  var config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false
            }
  };
  if(chartNbrePlanetByType!=null){
    chartNbrePlanetByType.destroy();
}
// document.getElementById('chartNbrePlanetByType')
chartNbrePlanetByType = new Chart(document.getElementById("chartNbrePlanetByType"),config);

        }
    }
    xhr.open("POST","getNbrPlantParType",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);
 
}

function getPlanteByPrice(){
    // alert(document.getElementById("getPlanteByPriceValue").value);
    var value=document.getElementById("getPlanteByPriceValue").value;
    var operation=document.getElementById("getPlanteByPrice").value;
    if(value !="" && operation!=""){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status==200 && this.readyState==4){
                var data=JSON.parse(this.responseText);
                document.getElementById("resulePlanteByPrice").innerHTML=data.data[0];
            }
        }
        xhr.open("POST","getPriceByOperation",true);
        var f=new FormData();
        var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
        f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
        f.append("value",value);
        f.append("operation",operation);
        xhr.send(f);    
    }else
    document.getElementById("resulePlanteByPrice").innerHTML=0;


}
function hideFormJardininer(){
    document.getElementById("formulaire").classList.add("formulaire");
    document.getElementById("formulaire").classList.remove("showFormulaire");    
    document.getElementById("cniJardinier").value="";
    document.getElementById("nomJardinier").value="";
    document.getElementById("prenomJardinier").value="";
    document.getElementById("emailJardinier").value="";
    document.getElementById("telJardinier").value="";
    document.getElementById("dateEmbousheJardinier").value="";
    document.getElementById("sexeJardinier").value="";
    document.getElementById("submitJardinier").value="Ajouter";
}
function submitJardinier(){
    var photo=document.getElementById("photoJardinier").files[0];
    var cni=document.getElementById("cniJardinier").value;
    var nom=document.getElementById("nomJardinier").value;
    var prenom=document.getElementById("prenomJardinier").value;
    var email=document.getElementById("emailJardinier").value;
    var tel=document.getElementById("telJardinier").value;
    var dateEmboushe=document.getElementById("dateEmbousheJardinier").value;
    var sexe=document.getElementById("sexeJardinier").value;
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if((document.getElementById("photoJardinier").files.length==1 && document.getElementById("submitJardinier").value=="Ajouter" && cni!="" && nom!="" && prenom!="" && email!="" && tel!="" && dateEmboushe!="" && sexe!="") || ( document.getElementById("submitJardinier").value=="Moddifier" && cni!="" && nom!="" && prenom!="" && email!="" && tel!="" && dateEmboushe!="" && sexe!="")){
        let rEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let  rTel = /^[0-9]{10}$/;
        if(email.match(rEmail)){
            if(tel.match(rTel)){
                var f=new FormData();
                f.append("photo",photo);
                f.append("cni",cni);
                f.append("nom",nom);
                f.append("prenom",prenom);
                f.append("email",email);
                f.append("tel",tel);
                f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);        
                f.append("dateEmboushe",dateEmboushe);
                if(document.getElementById("submitJardinier").value=="Moddifier")
                f.append("id",idJardinier);
                f.append("sexe",sexe);
                var xhr=new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(this.readyState==4 && this.status==200){
                        var {type,message}=JSON.parse(this.responseText);
                        if(type=="error"){
                            toastr.warning(message,"",{positionClass:"toast-bottom-right"});
                        }
                        if(type=="success"){
                            toastr.success(message,"",{positionClass:"toast-bottom-right"});
                            hideFormJardininer();
                            getDataJardinier();
                            // getDataPlante();
                        }
        
                    }
                }
                if(document.getElementById("submitJardinier").value=="Moddifier"){

                    xhr.open("POST","updateJardinier",false);
                }                
                else{                    
                    xhr.open("POST","addJardinier",false);
                }
                xhr.send(f);
            }else
            toastr.warning("SVP cet telephone est invalide ","",{positionClass:"toast-bottom-right"});
        }else 
        toastr.warning("SVP cet email est invalide !!","",{positionClass:"toast-bottom-right"});
    }else
    toastr.warning("SVP remplire toute la formulaire !!","",{positionClass:"toast-bottom-right"});
}
var offsetJardinier=0;
function getDataJardinier(){
    getNbrAnneEmbaush();
    getNbrJardinierParAnnee();
    getJardinierParSexe();
    getLatesAddedJardinier();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var data=JSON.parse(JSON.parse(this.responseText).data);
            if(data.length>0){
                var strData="";
                for(i=0;i<data.length;i++){
                    strData+="<tr><td><img src='/media/"+data[i].fields.photo+"' class='comptImage'></td><td>"+data[i].fields.cni+"</td><td>"+data[i].fields.nom+"</td><td>"+data[i].fields.prenom+"</td><td>"+data[i].fields.email+"</td><td>"+data[i].fields.sexe+"</td><td><ion-icon onclick='deleteJardinier("+data[i].pk+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";   
                }
                document.getElementById("listJardinier").innerHTML=strData;    
            }else
            offsetJardinier=offsetJardinier-5;         
                    }
    }
    xhr.open("POST","getDataJardinier",true);
    var f=new FormData();
    f.append("ofsset",offsetJardinier);
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);        
    xhr.send(f);
}
function navDataJardinier(data){
    if(data=="nex"){
        offsetJardinier=offsetJardinier+5;
    } 
    if(data=="pre" && offsetJardinier!=0){
        offsetJardinier=offsetJardinier-5;
    }
    getDataJardinier();
   
}
function deleteJardinier(id){
    if(window.confirm("Voulez vous vraiment supprimer cet Jardinier")){
        var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
       var xhr=new XMLHttpRequest();
       xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            toastr.success(message,"",{positionClass:"toast-bottom-right"});
            getDataJardinier();
        }
       }
       xhr.open("POST","deleteJardinier",true);
       var f=new FormData();
       f.append("id",id);
       f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);        
       xhr.send(f);
    }
}
var idJardinier=0;
function updateJardinier(data,id){
    var {cni,nom,prenom,email,sexe,tel,dateEmbauch}=data;
   if(cni!=undefined){
    document.getElementById("cniJardinier").value=cni;
    document.getElementById("nomJardinier").value=nom;
    document.getElementById("prenomJardinier").value=prenom;
    document.getElementById("emailJardinier").value=email;
    document.getElementById("telJardinier").value=tel;
    document.getElementById("dateEmbousheJardinier").value=dateEmbauch[0]+dateEmbauch[1]+dateEmbauch[2]+dateEmbauch[3]+"-"+dateEmbauch[5]+dateEmbauch[6]+"-"+dateEmbauch[8]+dateEmbauch[9];
    document.getElementById("sexeJardinier").value=sexe; 
}else{
    document.getElementById("cniJardinier").value=data[2];
    document.getElementById("nomJardinier").value=data[3];
    document.getElementById("prenomJardinier").value=data[4];
    document.getElementById("emailJardinier").value=data[5];
    document.getElementById("telJardinier").value=data[6];
    dateEmbauch=data[7]
    document.getElementById("dateEmbousheJardinier").value=dateEmbauch[0]+dateEmbauch[1]+dateEmbauch[2]+dateEmbauch[3]+"-"+dateEmbauch[5]+dateEmbauch[6]+"-"+dateEmbauch[8]+dateEmbauch[9];
    document.getElementById("sexeJardinier").value=data[8]; 
}
   showForm();
   document.getElementById("submitJardinier").value="Moddifier";
   idJardinier=id;
}
function detailJardinier(data,id){
    var {cni,nom,prenom,email,sexe,tel,dateEmbauch,photo}=data;
    if(cni!=undefined){
        document.getElementById("photoCompletDetailJardinier").src="/media/"+photo;
       document.getElementById("nomCompletDetailJardinier").innerHTML=nom+" "+prenom;
       document.getElementById("cniCompletDetailJardinier").innerHTML=cni;
       document.getElementById("emailCompletDetailJardinier").innerHTML=email;
       document.getElementById("telCompletDetailJardinier").innerHTML=tel;
       document.getElementById("dateEmboushCompletDetailJardinier").innerHTML=dateEmbauch[0]+dateEmbauch[1]+dateEmbauch[2]+dateEmbauch[3]+"-"+dateEmbauch[5]+dateEmbauch[6]+"-"+dateEmbauch[8]+dateEmbauch[9];
       document.getElementById("sexeCompletDetailJardinier").innerHTML=sexe;
    }else{

        document.getElementById("photoCompletDetailJardinier").src="/media/"+data[1];
       document.getElementById("nomCompletDetailJardinier").innerHTML=data[3]+" "+data[4];
       document.getElementById("cniCompletDetailJardinier").innerHTML=data[2];
       document.getElementById("emailCompletDetailJardinier").innerHTML=data[5];
       document.getElementById("telCompletDetailJardinier").innerHTML=data[6];
       dateEmbauch=data[7]
       document.getElementById("dateEmboushCompletDetailJardinier").innerHTML=dateEmbauch[0]+dateEmbauch[1]+dateEmbauch[2]+dateEmbauch[3]+"-"+dateEmbauch[5]+dateEmbauch[6]+"-"+dateEmbauch[8]+dateEmbauch[9];
       document.getElementById("sexeCompletDetailJardinier").innerHTML=data[8];
    }
 document.getElementById("detailForm").classList.remove("detailForm");
 document.getElementById("detailForm").classList.add("showDetailForm");
}
function hideDetailForm(){
    document.getElementById("detailForm").classList.add("detailForm");
    document.getElementById("detailForm").classList.remove("showDetailForm");   

}
function searchJardinier(){
    var cni=document.getElementById("cniJardinierSearch").value;
    var nom=document.getElementById("nomJardinierSearch").value;
    var prenom=document.getElementById("prenomJardinierSearch").value;
    var email=document.getElementById("emailJardinierSearch").value;
    var tel=document.getElementById("telJardinierSearch").value;
    var sexe=document.getElementById("sexeJardinierSearch").value;
    var dateEmboush=document.getElementById("dateEmboushJardinierSearch").value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            console.log(data.data[0])
             var strData="";
            for(i=0;i<data.data.length;i++){
            strData+="<tr><td><img src='/media/"+data.data[i][1]+"' class='comptImage'></td><td>"+data.data[i][2]+"</td><td>"+data.data[i][3]+"</td><td>"+data.data[i][4]+"</td><td>"+data.data[i][5]+"</td><td>"+data.data[i][8]+"</td><td><ion-icon onclick='deleteJardinier("+data.data[i][0]+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardinier("+JSON.stringify(data.data[i])+","+data.data[i][0]+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardinier("+JSON.stringify(data.data[i])+","+data.data[i][0]+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";
            }
            document.getElementById("listJardinier").innerHTML=strData;
        
        }
    }
    xhr.open("POST","searchJardinier",true);
    var f=new FormData();
    f.append("cni",cni);
    f.append("nom",nom);
    f.append("prenom",prenom);
    f.append("email",email);
    f.append("tel",tel);
    f.append("sexe",sexe);
    f.append("dateEmboushe",dateEmboush);
    f.append("cni",cni);
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);        
    xhr.send(f);
}
function getNbrAnneEmbaush(){
 var xhr=new XMLHttpRequest();
 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){

        var data=JSON.parse(this.responseText);
        var strData="<option value=''>Tout</option>";

        for(i=0;i<data.data.length;i++){
            strData+="<option value='"+data.data[i]+"'>"+data.data[i]+"</option>";
        }
        document.getElementById("chartNbarDateEmboush").innerHTML=strData;

    }
 }
 xhr.open("POST","getNbrAnneEmbaush",true);
 var f=new FormData();
 var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
 f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
 xhr.send(f);
}
// nbrJardinierParMois
var nbrJardinierParMois = null; 

function getNbrJardinierParAnnee(){
    var annee=document.getElementById("chartNbarDateEmboush").value;
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status!="" && this.readyState==4){
                // alert(this.responseText);
                var data=JSON.parse(this.responseText);
                var dataJardinier=new Array();
                var countJardinier=new Array();
                for(i=0;i<data.data.length;i++){
                    dataJardinier.push(data.data[i][0]);
                    countJardinier.push(data.data[i][1]);
                }
                data = {
                    labels: dataJardinier,
                    datasets: [{
                      label: 'Nombre des Jardinier Ajouter Par Date D Emboush',
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      data: countJardinier,
                    }]
                  };
                  var config = {
                    type: 'bar',
                    data: data,
                    options: {
                      responsive: true,
                      maintainAspectRatio: false
                            }
                  };
                if(nbrJardinierParMois!=null){
                    nbrJardinierParMois.destroy();
                }
                nbrJardinierParMois = new Chart(document.getElementById("nbrJardinierParMois"),config);                
    
            }
        }
        xhr.open("POST","getNbrJardinierParAnnee",true);
        var f=new FormData();
        var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
        f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
        if(annee!=""){
            f.append("annee",annee);
        }    
        xhr.send(f);      

}
function getJardinierParSexe(){
    var xhr =new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            document.getElementById("nbrCountHommeJardinier").innerHTML=data.data[1][1];
            document.getElementById("nbrCountFemmeJardinier").innerHTML=data.data[0][1];
        }

    }
    
    xhr.open("POST","getJardinierParSexe",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);
}
function getLatesAddedJardinier(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
                var strData="";
                for(i=0;i<data.data.length;i++){
                    // strData+="<tr><td><img src='/media/"+data.data[i][0]+"' class='comptImage'></td><td>"+data[i].fields.cni+"</td><td>"+data[i].fields.nom+"</td><td>"+data[i].fields.prenom+"</td><td>"+data[i].fields.email+"</td><td>"+data[i].fields.sexe+"</td><td><ion-icon onclick='deleteJardinier("+data[i].pk+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";   
                    strData+="<div class='latestItemAdded'>&nbsp;&nbsp; <img src='/media/"+data.data[i][0]+"' class='comptImage'><div id='fullNameLatesAdded'>"+data.data[i][1]+" "+data.data[i][2]+"</div> </div>";
                }
                document.getElementById("listLatestAdded").innerHTML=strData;    
       }
    }
    xhr.open("POST","getLatesAddedJardinier",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);

}
function getJardinierForJardin(){
    
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var str="<option value='' >Chosire une jardinier</option>";
            for(i=0;i<data.data.length;i++){
             str+="<option value='"+data.data[i][0]+"' >"+data.data[i][1]+" "+data.data[i][2]+"</option>";
            }
            document.getElementById("jardinierJardin").innerHTML=str;
        }
    }
    xhr.open("POST","getJardinierForJardin",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);
    
}
function submitJardin(){
    var photo=document.getElementById("photoJardin").files[0];
    var num=document.getElementById("numJardin").value;
    var nom=document.getElementById("nomJardin").value;
    var ville=document.getElementById("villeJardin").value;
    var adresse=document.getElementById("adresseJardin").value;
    var superficier=document.getElementById("superficierJardin").value;
    var jardinier=document.getElementById("jardinierJardin").value;
    if((num !="" && nom!="" && ville!="" && adresse!="" && superficier!="" && jardinier!="" && document.getElementById("submitJardin").value=="Moddifier") || (document.getElementById("photoJardin").files.length!=0 && num !="" && nom!="" && ville!="" && adresse!="" && superficier!="" && jardinier!="" && document.getElementById("submitJardin").value=="Ajouter")){
       var f=new FormData();
       var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
       f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);   
       f.append("num",num);
       f.append("nom",nom);
       f.append("ville",ville);
       f.append("adresse",adresse);
       f.append("superficier",superficier);
       f.append("jardinier",jardinier);
       f.append("photo",photo);
       if(document.getElementById("submitJardin").value=="Moddifier")
       f.append("id",idJardin);
       var xhr=new XMLHttpRequest();
       xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            if(type=="error"){
                toastr.warning(message,"",{positionClass:"toast-bottom-right"});
            }
            if(type=="success"){
                toastr.success(message,"",{positionClass:"toast-bottom-right"});
                hideFormJardin();
                getDataJardin();
            }
    
        }
       }
       if(document.getElementById("submitJardin").value=="Moddifier")
        xhr.open("POST","updateJardin",true);
        else
        xhr.open("POST","addJardin",true);
       xhr.send(f);
    }else
    toastr.warning("SVP remplire tout la formulaire !!","",{positionClass:"toast-bottom-right"});
  }
  function hideFormJardin(){
    document.getElementById("formulaire").classList.add("formulaire");
    document.getElementById("formulaire").classList.remove("showFormulaire");    
    document.getElementById("numJardin").value="";
    document.getElementById("nomJardin").value="";
    document.getElementById("villeJardin").value="";
    document.getElementById("adresseJardin").value="";
    document.getElementById("superficierJardin").value="";
    document.getElementById("jardinierJardin").value="";
    document.getElementById("submitJardin").value="Ajouter";
    
  }
  var offsetJardin=0;
  function getDataJardin(){
    document.getElementById("numeroJardinSearch").value="";
    document.getElementById("nomJardinSearch").value="";
    document.getElementById("adresseJardinSearch").value="";
    document.getElementById("villeJardinSearch").value="";
    document.getElementById("superFicierJardinSearch").value="";
    document.getElementById("nomJardinierJardinSearch").value="";
    document.getElementById("prenomJardinierJardinSearch").value="";
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var strData="";
            if(data.data.length){
                
                for(i=0;i<data.data.length;i++){
    
                    strData+="<tr><td><img src='/media/"+data.data[i][0]+"' class='comptImage'></td><td>"+data.data[i][3]+"</td><td>"+data.data[i][9]+" "+data.data[i][10]+"</td><td>"+data.data[i][4]+"</td><td>"+data.data[i][5]+"</td><td>"+data.data[i][2]+"</td><td><ion-icon onclick='deleteJardin("+data.data[i][15]+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardin("+JSON.stringify(data.data[i])+","+data.data[i][15]+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardin("+JSON.stringify(data.data[i])+","+data.data[i][15]+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";         
                }
                document.getElementById("listJardin").innerHTML=strData;
            }else
        offsetJardin=offsetJardin-5;

        }
    } 
    xhr.open("POST","getDataJardin",false);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("offset",offsetJardin);
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);   
    xhr.send(f);
  }
  function deleteJardin(id){
    if(window.confirm("Voulez vous vraiment supprimer cet jardin ?")){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status==200 && this.readyState==4){
                var{type,message}=JSON.parse(this.responseText);
                toastr.success(message,"",{positionClass:"toast-bottom-right"});
                getDataJardin();
            }
        }
        xhr.open("POST","deleteJardin",true);
        var f=new FormData();
        var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
        f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
        f.append("id",id);
        xhr.send(f);
    }
  }
  var idJardin=0;
  function updateJardin(data,id){
    document.getElementById("numJardin").value=data[2];
    document.getElementById("nomJardin").value=data[3];
    document.getElementById("villeJardin").value=data[4];
    document.getElementById("adresseJardin").value=data[5];
    document.getElementById("superficierJardin").value=data[6];
    document.getElementById("jardinierJardin").value=data[7];
    idJardin=id;
    document.getElementById("submitJardin").value="Moddifier";
    showForm();    
  }

function detailJardin(data,id){

    document.getElementById("photoDetailJardin").src='/media/'+data[0];
    document.getElementById("nomtDetailJardin").innerHTML=data[3];
    document.getElementById("NumeroDetailJardin").innerHTML=data[2];
    document.getElementById("adresseDetailJardinier").innerHTML=data[5];
    document.getElementById("villeDetailJardinier").innerHTML=data[4];
    document.getElementById("superficierDetailJardinier").innerHTML=data[6];
    document.getElementById("photoCompletDetailJardinierJardin").src='/media/'+data[1];
    document.getElementById("nomCompletDetailJardinierJardin").innerHTML=data[9]+" "+data[10];
    document.getElementById("cniCompletDetailJardinierJardin").innerHTML=data[8];
    document.getElementById("emailCompletDetailJardinierJardin").innerHTML=data[11];
    document.getElementById("telCompletDetailJardinierJardin").innerHTML=data[13];

    dateEmbauch=data[14]
    document.getElementById("dateEmboushCompletDetailJardinierJardin").innerHTML=dateEmbauch[0]+dateEmbauch[1]+dateEmbauch[2]+dateEmbauch[3]+"-"+dateEmbauch[5]+dateEmbauch[6]+"-"+dateEmbauch[8]+dateEmbauch[9];

    document.getElementById("sexeCompletDetailJardinierJardin").innerHTML=data[12];
    document.getElementById("detailForm").classList.remove("detailForm");
    document.getElementById("detailForm").classList.add("showDetailForm");
    
}
function searchJardin(){
    var numero=document.getElementById("numeroJardinSearch").value;
    var nom=document.getElementById("nomJardinSearch").value;
    var adresse=document.getElementById("adresseJardinSearch").value;
    var ville=document.getElementById("villeJardinSearch").value;
    var superFicier=document.getElementById("superFicierJardinSearch").value;
    var nomJardinier=document.getElementById("nomJardinierJardinSearch").value;
    var prenomJardinier=document.getElementById("prenomJardinierJardinSearch").value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var strData="";
            for(i=0;i<data.data.length;i++){

                strData+="<tr><td><img src='/media/"+data.data[i][0]+"' class='comptImage'></td><td>"+data.data[i][3]+"</td><td>"+data.data[i][9]+" "+data.data[i][10]+"</td><td>"+data.data[i][4]+"</td><td>"+data.data[i][5]+"</td><td>"+data.data[i][2]+"</td><td><ion-icon onclick='deleteJardin("+data.data[i][15]+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardin("+JSON.stringify(data.data[i])+","+data.data[i][15]+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardin("+JSON.stringify(data.data[i])+","+data.data[i][15]+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";         
            }
            document.getElementById("listJardin").innerHTML=strData;
        }
    }
    xhr.open("POST","searchJardin",true);
    var f=new FormData();
    f.append("numero",numero);
    f.append("nom",nom);
    f.append("adresse",adresse);
    f.append("ville",ville);
    f.append("superFicier",superFicier);
    f.append("nomJardinier",nomJardinier);
    f.append("prenomJardinier",prenomJardinier);
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);
}
function navDataJardin(data){
    if(data=="nex"){
        offsetJardin=offsetJardin+5;
    } 
    if(data=="pre" && offsetJardin!=0){
        offsetJardin=offsetJardin-5;
    }
    getDataJardin();

}
var getNbrJardinParJardinierChart = null; 

function getNbrJardinParJardinier(){
 var xhr=new XMLHttpRequest();
 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
        var data=JSON.parse(this.responseText);
        var labels=new Array();
        var counts=new Array();
        for(i=0;i<data.data.length;i++){
            labels.push(data.data[i][0]+" "+data.data[i][1])
            counts.push(data.data[i][2])
        }
        data = {
            labels: labels,
            datasets: [{
              label: 'Nombre des Jardin Par Jardinier',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              data: counts,
            }]
          };
          var config = {
            type: 'bar',
            data: data,
            options: {
              responsive: true,
              maintainAspectRatio: false
                    }
          };
        if(getNbrJardinParJardinierChart!=null){
            getNbrJardinParJardinierChart.destroy();
        }
        getNbrJardinParJardinierChart = new Chart(document.getElementById("getNbrJardinParJardinierChart"),config);                

    }
 }
 xhr.open("POST","getNbrJardinParJardinier",true);
 var f=new FormData();
 var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
 f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
 xhr.send(f);
}
var getJardinParVilleChart = null; 

function getJardinParVille(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var villes=new Array();
            var counts=new Array();
            for(i=0;i<data.data.length;i++){
                villes.push(data.data[i][0]);
                counts.push(data.data[i][1])
            }
            data = {
                labels: villes,
                datasets: [{
                  label: 'Nombre des Jardin Par Ville',
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  data: counts,
                }]
              };
              var config = {
                type: 'bar',
                data: data,
                options: {
                  responsive: true,
                  maintainAspectRatio: false
                        }
              };
            if(getJardinParVilleChart!=null){
                getJardinParVilleChart.destroy();
            }
            getJardinParVilleChart = new Chart(document.getElementById("getJardinParVilleChart"),config);                
    
    
        }
    }
    xhr.open("POST","getJardinParVille",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);
   
}
function getTheMosteRecomendedGardens(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var data=JSON.parse(this.responseText);
            var strData="";
            for(i=0;i<data.data.length;i++){
                // strData+="<tr><td><img src='/media/"+data.data[i][0]+"' class='comptImage'></td><td>"+data[i].fields.cni+"</td><td>"+data[i].fields.nom+"</td><td>"+data[i].fields.prenom+"</td><td>"+data[i].fields.email+"</td><td>"+data[i].fields.sexe+"</td><td><ion-icon onclick='deleteJardinier("+data[i].pk+")' class='Icon Icon_delete' name='trash-outline'></ion-icon></td><td><ion-icon onclick='updateJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_update' name='pencil-outline'></ion-icon></td><td><ion-icon onclick='detailJardinier("+JSON.stringify(data[i].fields)+","+data[i].pk+")' class='Icon Icon_details' name='information-outline'></ion-icon></td></tr>";   
                strData+="<div class='latestItemAdded'>&nbsp;&nbsp; <img src='/media/"+data.data[i][2]+"' class='comptImage'><div id='fullNameLatesAdded'>"+data.data[i][0]+" "+data.data[i][1]+"</div> </div>";
            }
            document.getElementById("listMostRecomended").innerHTML=strData;    

        }
    }
    xhr.open("POST","getTheMosteRecomendedGardens",true);
    var f=new FormData();
    var csrfmiddlewaretoken=document.getElementsByName("csrfmiddlewaretoken")[0].value;
    f.append("csrfmiddlewaretoken",csrfmiddlewaretoken);
    xhr.send(f);

}
