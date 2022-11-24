function table_insertion(frame_length,page_set,i)
{
    for(var j = 0; j<frame_length; j++)
    {
        var table = document.getElementById("table-"+i).children[0].children[j];
        if(page_set[j] == undefined)
        {
            table.innerHTML= "\u00A0";
        }
        else{
            table.innerHTML = page_set[j];
        }
    }
}
function firstinfirstout()
{ 
    let frame_length = document.getElementById("frames").value;//input - number of frames
    frame_length = parseFloat(frame_length);
    let reference_string = document.getElementById("refstr").value;//input - reference string
    var length = reference_string.length;
    var output_array = []
    var page_set = [];
    var queue = [];
    for(var i = 0; i<length; i++)
    { 
        if(page_set.length < frame_length)
        {
            if(!page_set.includes(parseFloat(reference_string[i])))
            {
                page_set.push(parseFloat(reference_string[i]));
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
                var index = page_set.indexOf(parseFloat(reference_string[i]));
                document.getElementById("table-"+i).children[0].children[index].style.background = "red";
            }
            else{
                var index = page_set.indexOf(parseFloat(reference_string[i]));
                document.getElementById("table-"+i).children[0].children[index].style.background = "green";
            }
        }
        console.log(page_set);
        output_array.push(page_set);
        //inserting final data into table
        table_insertion(frame_length,page_set,i);
    }
}
function leastrecentlyused()
{
    var frame_length = document.getElementById("frames").value;;
    var page_set = [];
    var usage_list = [];
    var output_array = [];
    let reference_string = document.getElementById("refstr").value;
    for(var i = 0; i<reference_string.length; i++)
    {
        if(!page_set.includes(reference_string[i]))
        {
            if(page_set.length < frame_length)
            {
                usage_list.push(reference_string[i]);
                page_set.push(reference_string[i]);
            }
            else
            {
                var min_index;
                var min_page;
                min_index = usage_list.indexOf(page_set[0]);
                for(var j = 1; j<page_set.length; j++)
                {
                    if(usage_list.includes(page_set[j]))
                    {
                        if(usage_list.indexOf(page_set[j]) < min_index)
                        {
                            min_index = usage_list.indexOf(page_set[j]);
                            min_page = page_set[j];
                        }
                    } 
                }
                page_set[page_set.indexOf(min_page)] = reference_string[i];
                usage_list.push(reference_string[i]);   
            }
            var index = page_set.indexOf(reference_string[i]);
            document.getElementById("table-"+i).children[0].children[index].style.background = "red";
        }
        else
        {   
            usage_list.push(reference_string[i]);
            var index = page_set.indexOf(reference_string[i]);
            document.getElementById("table-"+i).children[0].children[index].style.background = "green";
        }
        console.log(usage_list);  
        output_array.push(page_set);
        table_insertion(frame_length,page_set,i);
    }
}
function predict(pg,fr,pn,index,frame_length)
{
    var res = -1, farthest = index;
    for (var i = 0; i < frame_length; i++) {
        var j;
        for (j = index; j < pn; j++) {
            if (fr[i] == pg[j]) {
                if (j > farthest) {
                    farthest = j;
                    res = i;
                }
                break;
            }
        }
        if (j == pn)
            return i;
    }
    return (res == -1) ? 0 : res;
}
function optimal()
{
    console.log("optimal");
    var frame_length = document.getElementById("frames").value;;
    var page_set = [];
    var usage_list = [];
    var output_array = [];
    let reference_string = document.getElementById("refstr").value;
    console.log(reference_string);
    for(var j = 0; j<reference_string.length; j++)
    {
        usage_list.push(reference_string[j]);
    }
    console.log(usage_list);     
    for(var i =0; i<reference_string.length; i++)
    {
        if(page_set.includes(reference_string[i]))
        {
            var index = page_set.indexOf(reference_string[i]);
            document.getElementById("table-"+i).children[0].children[index].style.background = "green";
        }
        else
        {
            if(page_set.length < frame_length)
            {
                page_set.push(reference_string[i]);
            }
            else
            {
                var j = predict(reference_string,page_set,reference_string.length,i+1,frame_length);
                page_set[j] = reference_string[i];
                var index = page_set.indexOf(reference_string[i]);
                document.getElementById("table-"+i).children[0].children[index].style.background = "red";
            }
        }
        
        output_array.push(page_set); 
        table_insertion(frame_length,page_set,i);
    }
}
function table_generator()
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
    var element = document.getElementById("algo");
    if(element.value == "FIFO")
    {
        firstinfirstout();
    }
    else if(element.value == "LRU")
    {
        leastrecentlyused();
    }
    else if(element.value == "OPT")
    {
        optimal();
    }
    
}
function display()
{
    table_generator();
}