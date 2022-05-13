
$('#name').keyup(validateTextarea);
$('#name').click(validateTextarea);
$('#name1').keyup(validateTextarea);
$('#name1').click(validateTextarea);


function validateTextarea() {
        var errorMsg = "Please match the format requested.";
        var textarea = this;
        var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$');
               $.each($(this).val().split("\n"), function () {
            var hasError = !this.match(pattern);
            if (typeof textarea.setCustomValidity === 'function') {
                textarea.setCustomValidity(hasError ? errorMsg : '');
            } else {
                
                $(textarea).toggleClass('error', !!hasError);
                $(textarea).toggleClass('ok', !hasError);
                if (hasError) {
                    $(textarea).attr('title', errorMsg);
                } else {
                    $(textarea).removeAttr('title');
                }
            }
            return !hasError;
        });
    }





$(document).ready(function() {

       $(".getValue").click(function(){


    var input = $('#name').val().replace(/\s/g,"");
    var input1 = $('#name1').val().replace(/\s/g,"");
    var i = document.getElementById("number").value;
    var j = document.getElementById("number1").value;
    const pattern= /[A,T,G,C,/\s/g]/gi;

    const verif= input.match(pattern);
    const verif1= input1.match(pattern);
    
    const str = input;
    const str1 = input1;
    var taille = str.length; 
    var taille1 = str1.length;
    var veriftail = verif.length;
    var veriftail1= verif1.length;


    if (taille !== veriftail) alert("Adapter wrong content!")

        else 

            if(taille1 !== veriftail1) alert("RNA sequence wrong content!")
                else


                if (i > taille) alert("There is not enough nucleotide in adapter sequence!")


                    else 
                        if (j > taille1) alert("There is not enough nucleotide in RNA sequence!")
                            else {

        
        var RNA1 = str.slice(0,i);
        const str2 = str1.slice(0,j);
        let str3 = str2.split('').reverse().join('');
    
    
        var mapObj = {A:"T",C:"G",G:"C",T:"A"};

            var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
            RNA2= str3.replace(re, function(matched){
            return mapObj[matched];
            });

        document.getElementById("prem_part").innerHTML= RNA2
        document.getElementById("sec_part").innerHTML= RNA1
        document.getElementById("oligo_seq").value= RNA2+RNA1
    }
    });
   




    $(".rst").click(function() {
    document.getElementById("oligo_seq").value="";
    document.getElementById("name_oligo").value="";
    document.getElementById("prem_part").innerHTML = "";
    document.getElementById("sec_part").innerHTML= "";

    });


    $(".add").click(function() {

        

        var nom = $("#name_oligo").val();
        var sequence = $("#oligo_seq").val();
        
        if (sequence =="") alert("No sequence to add");

        else

            if (nom =="") {
        var confirmation = confirm("There is no oligo name. Are you sure to continue?");
                    if(confirmation == true) {
        

                    var mapObj1 = {A:"T",C:"G",G:"C",T:"A"};

                    var re = new RegExp(Object.keys(mapObj1).join("|"),"gi");
                    RNA_pre= sequence.replace(re, function(matched){
                    return mapObj1[matched];
                     });
                    let RNA_order= RNA_pre.split('').reverse().join('');


                    var ligne = "<tr><td><input type='checkbox' name='select'></td><td>" + nom + "</td><td>" + RNA_order + "</td></tr>";
                    $("table.test").append(ligne);

                    document.getElementById("oligo_seq").value="";
                    document.getElementById("name_oligo").value="";
                    document.getElementById("prem_part").innerHTML = "";
                    document.getElementById("sec_part").innerHTML= "";
                                            }
                    }
            else {
        

                    var mapObj1 = {A:"T",C:"G",G:"C",T:"A"};

                    var re = new RegExp(Object.keys(mapObj1).join("|"),"gi");
                    RNA_pre= sequence.replace(re, function(matched){
                    return mapObj1[matched];
                     });
                    let RNA_order= RNA_pre.split('').reverse().join('');
                    var ligne = "<tr><td><input type='checkbox' name='select'></td><td>" + nom + "</td><td>" + RNA_order + "</td></tr>";
                    $("table.test").append(ligne);

                    document.getElementById("oligo_seq").value="";
                    document.getElementById("name_oligo").value=""; 
                    document.getElementById("prem_part").innerHTML = "";
                    document.getElementById("sec_part").innerHTML= "";
                    }


    });


    $(".delete").click(function() {
        $("table.test").find('input[name="select"]').each(function() {
            if ($(this).is(":checked")) {
                $(this).parents("table.test tr").remove();
            }
        });
    });



    $(".deleteall").click(function() {
        var confirmation = confirm("Do you want to delete all?");
        $("table.test").find('input[name="select"]').each(function() {
        if(confirmation == true) {
            $(this).parents("table.test tr").remove();
                }
                });
    });



    $(".exportcsv").click(function(){

    var table = document.getElementById("table2");
    var rows =[];
 
    for(var i=0,row; row = table.rows[i];i++){

        column1 = row.cells[1].innerText;
        column2 = row.cells[2].innerText;

        rows.push(
            [
                column1,
                column2
            ]
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";

        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Oligo_sequence.csv");
        document.body.appendChild(link);
        link.click();

        });
});





