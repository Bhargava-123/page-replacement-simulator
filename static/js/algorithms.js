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
                var index = page_set.indexOf(parseFloat(reference_string[i]));
                document.getElementById("table-"+i).children[0].children[index].style.background = "red";
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
                var index = page_set.indexOf(parseFloat(reference_string[i]));
                document.getElementById("table-"+i).children[0].children[index].style.background = "red";
            }
            else{
                var index = page_set.indexOf(parseFloat(reference_string[i]));
                document.getElementById("table-"+i).children[0].children[index].style.background = "green";
            }
        }
        output_array.push(page_set);
        //console.log(page_set);
        for(var j = 0; j<frame_length; j++)
        {
            var table = document.getElementById("table-"+i).children[0].children[j];
            console.log(table);
            if(page_set[j] == undefined)
            {
                table.innerHTML= "\u00A0";
            }
            else{
                table.innerHTML = page_set[j];
            }

            // if(j == frame_length-1)
            // {
            //     table.insertAdjacentHTML("beforebegin",`<tr> ${reference_string[i]}</tr>`);
            // }
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

    var parent = document.getElementById("id_parent");
    var rs_table = document.createElement("table")
    let rs_table_row = rs_table.insertRow(-1);
    var rs_table_div = document.createElement("div");
    for(var a = 0; a<length; a++)
    {
        let num = document.createTextNode("    "+reference_string[a]+"   ");
        let rs_table_data = rs_table_row.insertCell(-1);
        rs_table_data.style.paddingInline= "3.00mm";
        rs_table_data.appendChild(num);
        
    }
    rs_table.style.display = "inline-block";
    // rs_table.style.paddingRight = "1px";
    // rs_table.style.padding = "1px";
    rs_table.setAttribute("border","1");
    rs_table.style.border = "0px solid black";
    rs_table.style.borderCollapse = "collapse";
    rs_table.style.borderStyle = "dotted";
    rs_table_div.appendChild(rs_table);
    parent.appendChild(rs_table_div);
    

    
    for(var j = 0; j<length; j++)//loop for each table  
    {
        
        
        
        var x = document.createElement("table");
        x.setAttribute("id","table-"+j);
        x.setAttribute("border","0");
        x.style.border = "1px solid black";
        x.style.borderCollapse = "collapse";
        x.style.borderStyle = "dotted";
        x.style.display = "inline-block";
        // x.style.paddingRight = "10px";
        x.style.padding = "10px";
        x.style.paddingInline = "11px";
        
        
        
        
        for(var i = 1; i<=frames; i++)//loop for each row
        {
            var text;
            text = document.createTextNode("row "+i);
            
            const row = x.insertRow(-1);
            row.setAttribute("id","row-"+(i-1));
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