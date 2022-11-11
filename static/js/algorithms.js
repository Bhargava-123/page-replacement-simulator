function firstinfirstout()
{
    document.getElementById("id_parent").innerHTML = "";

    let frames = document.getElementById("frames").value;
    frames = parseFloat(frames);
    let reference_string = document.getElementById("refstr").value;
    var length = reference_string.length;
    for(var j = 1; j<=length; j++)
    {
        
        var parent = document.getElementById("id_parent");
        var x = document.createElement("table");
        x.setAttribute("class","table-"+j);
        x.setAttribute("border","0");
        x.style.border = "1px solid black";
        x.style.borderCollapse = "collapse";
        x.style.borderStyle = "dotted";
        x.style.display = "inline-block";
        x.style.paddingRight = "10px";
        x.style.padding = "10px";
        for(var i = 1; i<=frames; i++)
        {
            const text = document.createTextNode("row "+i);
            const row = x.insertRow(-1);
            row.setAttribute("class","row-"+i);
            const data = row.insertCell(-1);
            data.appendChild(text);
        }
        // document.body.appendChild(x);
        parent.appendChild(x)
        document.querySelector(".table-"+j+" .row-2").style.background = "red";
    }
}
function display()
{
    var element = document.getElementById("algo");
    if(element.value == "FIFO")
    {
        firstinfirstout();
    }
    else{
        alert("another option")
    }
}