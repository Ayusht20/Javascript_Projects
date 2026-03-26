let info=document.querySelector(".info");
let spinner=document.querySelector(".spinner");
let btn=document.querySelector("button");
let suggest=document.querySelector(".suggestions");
let input=document.querySelector("input");
let fetchWord=async()=>
{
    let wording=input.value.trim();
    if(wording==="")
    {
        alert("Can't be empty!")
        return;
    }
    info.innerHTML="";
    suggest.style.display="none";
    spinner.style.display="block";

    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${wording}`;
    try
    {
        let response=await fetch(url);
        let data = await response.json();
        if(!data  || data.length ===0)
        {
            throw new Error("No meaning found!");
        }
        console.log(data);
        const {word,meanings,phonetics}=data[0];
       const mean=meanings[0] || null;  
       if (!meanings.length) {
        throw new Error("No definitions available.");
    }
       let syno=[];
       let ano=[];
       for(let i of meanings)
       {
           if(i.synonyms?.length)
           {
            syno.push(...i.synonyms);
           }
           if(i.antonyms?.length)
           {
            ano.push(...i.antonyms);
           }
    }
    let synonymsText = syno.length ? syno.join(", ") : "Not available";
    let antonymsText = ano.length ? ano.join(", ") : "Not available";
    let ihtml=`<p><strong>Word:</strong>${word}</p>
    <p><strong>Meaning:</strong>${mean.definitions[0].definition}</p>
    <p><strong>Example:</strong>${mean.definitions[0].example || "Not available"}</p>
    <p><strong>Part Of Speech:</strong>${mean.partOfSpeech}</p>
    <p><strong>Synonyms:</strong>${synonymsText}</p>
    <p><strong>Antonyms:</strong>${antonymsText}</p>
    `;
    let audiosrc=phonetics.find(p=>p.audio)?.audio || null;   
    if(audiosrc)
    {
        ihtml+=`<h3 style="background: linear-gradient(135deg, #ff9a9e, #fad0c4);"><strong>Pronunciation:🔊</strong></h3>
        <audio controls>
            <source src="${audiosrc}" type="audio/mpeg">
            Your browser does not support audio.
        </audio>`;
    }
    info.innerHTML+=ihtml;
    suggest.style.display="none";
    spinner.style.display="none";

    }
    catch(error)
    {
        spinner.style.display="none";
        info.innerHTML=`<p>${error.message}</p>`;
        console.error("Error",error.message);
    }
}
input.addEventListener("keydown",(evt)=>
{
    if(evt.key==="Enter")
    {
        fetchWord();
    }
})
btn.addEventListener("click",fetchWord);
input.addEventListener("input",async()=>
{
     let query=input.value.trim();
     if(query.length ===0)
     {
        suggest.style.display="none";
        return;
     }
     let Url = `https://api.datamuse.com/sug?s=${query}`;
     let response = await fetch(Url);
     let words =await response.json();
     suggest.innerHTML="";
     if(words.length ===0)
     {
        suggest.style.display="none";
        return;
     }
     words.slice(0,5).forEach(word=>
        {
            let item=document.createElement("div");
            item.textContent=word.word;
            item.addEventListener("click",()=>
            {
                input.value=word.word;
                suggest.style.display="none";
            });
            suggest.appendChild(item);
        });
        suggest.style.display = "block";

})
document.addEventListener("click",()=>
{
    suggest.style.display="none"
})

