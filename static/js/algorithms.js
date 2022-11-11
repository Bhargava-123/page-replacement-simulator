function firstinfirstout_code()
{ //firstinfirst out algorithm prototype working
    let frame_length = document.getElementById("frames").value;//input - number of frames
    frame_length = parseFloat(frame_length);


    let reference_string = document.getElementById("refstr").value;//input - reference string
    var length = reference_string.length;

    var page_fault = -1;

    var output_array = [];

    var page_set = [];

    var queue = [];

    for(var i = 0; i<=length; i++)
    {   
        console.log(page_set);
        console.log("\n");
        if(page_set.length < frame_length)
        {
            if(!page_set.includes(parseFloat(reference_string[i])))
            {
                page_set.push(parseFloat(reference_string[i]));

                page_fault = page_fault + 1;

                queue.push(parseFloat(reference_string[i]));    
            }
        }
        else{
            if(!page_set.includes(parseFloat(reference_string[i])))
            {
                let val = queue[0];
                queue.shift();
                page_set[page_set.map((x,i) => [i,x]).filter(x => x[1] == val)[0][0]] = parseFloat(reference_string[i]);
                queue.push(parseFloat(reference_string[i]));
                page_fault = page_fault + 1;
            }
            }

    }
    alert(page_fault);


}
function firstinfirstout_table_generator()
{
    document.getElementById("id_parent").innerHTML = "";//clearing the contents of previous output

    let frames = document.getElementById("frames").value;//input - number of frames
    frames = parseFloat(frames);

    let reference_string = document.getElementById("refstr").value;//input - reference string
    var length = reference_string.length;

    for(var j = 1; j<=length; j++)//loop for each table  
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
        
        for(var i = 1; i<=frames; i++)//loop for each row
        {
            var text;
            if(i == 2)
            {
                text = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
            }
            else{
                text = document.createTextNode("row "+i);
            }
            
            const row = x.insertRow(-1);
            row.setAttribute("class","row-"+i);
            const data = row.insertCell(-1);
            data.appendChild(text);
        }
        parent.appendChild(x)
        document.querySelector(".table-"+j+" .row-2").style.background = "red";
    }
    firstinfirstout_code();
}
function display()
{
    var element = document.getElementById("algo");
    if(element.value == "FIFO")
    {
        firstinfirstout_table_generator();
    }
    else{
        alert("another option")
    }
}