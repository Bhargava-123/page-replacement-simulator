function firstinfirstout_code()
{ //firstinfirst out algorithm prototype working  
    let frame_length = document.getElementById("frames").value;//input - number of frames
    frame_length = parseFloat(frame_length);


    let reference_string = document.getElementById("refstr").value;//input - reference string
    var length = reference_string.length;

    var page_fault = -1;

    var output_array = []

    var page_set = [];

    var queue = [];

    for(var i = 0; i<length; i++)
    { 
        
        
        //console.log(page_set+"\n");
        if(page_set.length < frame_length)
        {
            if(!page_set.includes(parseFloat(reference_string[i])))
            {
                page_set.push(parseFloat(reference_string[i]));

                page_fault = page_fault + 1;

                queue.push(parseFloat(reference_string[i]));    
            }
        }
        else
        {
            if(!page_set.includes(parseFloat(reference_string[i])))
            {
                let val = queue[0];
                queue.shift();
                //to replace an element
                page_set[page_set.map((x,i) => [i,x]).filter(x => x[1] == val)[0][0]] = parseFloat(reference_string[i]);
                queue.push(parseFloat(reference_string[i]));
                page_fault = page_fault + 1;
            }
        }
        output_array.push(page_set);
        //console.log(page_set);
        for(var j = 0; j<frame_length; j++)
        {
            var table = document.getElementById("table-"+i).children[0].children[j].children[0];
            console.log(table);
            if(page_set[j] == undefined)
            {
                table.innerHTML= "\u00A0";
            }
            else{
                table.innerHTML = page_set[j];
            }
            
        }
    }
    //document.write("<br>"q+output_array+"<br>");

}
function firstinfirstout_table_generator()
{
    
    document.getElementById("id_parent").innerHTML = "";//clearing the contents of previous output

    let frames = document.getElementById("frames").value;//input - number of frames
    frames = parseFloat(frames);

    let reference_string = document.getElementById("refstr").value;//input - reference string
    var length = reference_string.length;

    for(var j = 0; j<length; j++)//loop for each table  
    {
        
        var parent = document.getElementById("id_parent");
        var x = document.createElement("table");
        x.setAttribute("id","table-"+j);
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
            text = document.createTextNode("row "+i);
            
            const row = x.insertRow(-1);
            row.setAttribute("id","row-"+i);
            const data = row.insertCell(-1);
            data.appendChild(text);
        }
        parent.appendChild(x)
        //document.querySelector(".table-"+j+" .row-2").style.background = "red";   
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