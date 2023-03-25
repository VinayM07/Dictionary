let input=document.getElementById("input");
let btn=document.getElementById("btn")
let di=document.getElementById("dinput")
let phone=document.getElementById("phone")
let para=document.getElementById("para")
let limbs=document.getElementById("limbs")
let vol=document.getElementById("sound")

var audio;
var w;
var temp;
input.addEventListener("keyup",function(e){
    w=e.target.value;
})
async function getapi(x){
    const k= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${x}`)
    if (k.status==200){
        temp=1;
        console.log("no error fuck me ")
    }
    if(k.status==404){
        temp=0;
        console.log("error fuck me ")
    }
    return await k.json();
}
btn.addEventListener("click",function(){
    
   getapi(w)
   
    .then(k=>
        {
           
            di.innerText=k[0].word;
            var defar=[];
            var ex=[];
            var ant=[];
            var syn=[];
            vol.style.display="inline"
            phone.style.display="block"
            di.style.display="inline"
            defar.push(`<h1>Definations</h1>
            `)
            let pn=k[0].meanings.length;
            for( let i=0;i<pn;i++){
               let part=k[0].meanings[i].partOfSpeech;
                defar.push(`<h4>${part}:</h4>`)
                defar.push(`<ul>`)
                var l=k[0].meanings[i].definitions.length;
                for(let j=0;j<l;j++){
                    defar.push(`<li>${k[0].meanings[i].definitions[j].definition}</li>`)
                    if(k[0].meanings[i].definitions[j].example!=undefined){
                    ex.push(k[0].meanings[i].definitions[j].example)
                    }
                }
                defar.push(`</ul>`)
                let z=k[0].meanings[i].synonyms.length;
                if (z>0){
                    for (let q=0;q<z;q++){
                        syn.push(k[0].meanings[i].synonyms[q])
                    }
                }
                let w=k[0].meanings[i].antonyms.length;
                if (w>0){
                    for (let q=0;q<w;q++){
                        ant.push(k[0].meanings[i].antonyms[q])
                    }
                }
               
               
            }
            if (syn.length>5){
                syn=syn.slice(0,5)
            }
            if (ant.length>5){
                ant=ant.slice(0,5)
            }
            let s=[]
            var src;
            var pon=[]
            let sn=k[0].phonetics.length;
            for (let h=0;h<sn;h++){
                if(k[0].phonetics[h].audio.length>1){
                    src=k[0].phonetics[h].audio;
                    break
                }
            }
            for (let h=0;h<sn;h++){
                if(k[0].phonetics[h].text!=undefined){
                    pon.push(k[0].phonetics[h].text)
                }
            }
            if (pon.length>4){
                pon=pon.slice(0,4)
            }
            pon=pon.join(" ")
            phone.innerText=pon;
            audio=new Audio( src)
            vol.addEventListener("click",function(){
                audio.play();
            })
            function removeDuplicates(arr) {
                return [...new Set(arr)];
            }
            ant=removeDuplicates(ant)
            syn=removeDuplicates(syn)
           
            defar.push(`</div>
            <div id="limbs" class="limbs">`)
            var temp=[]
            if (ex.length>=2){
                defar.push(`<h2 class="ex-head">Example</h2>
                 <ul class="ex-li">
                 <li>${ex[0]}</li>
                 <li>${ex[1]}</li></ul>
                `)
            }
            if (ex.length==1){
                defar.push(`
                 <ul class="ex-li"><li>${ex[0]}</li></ul>
                `)
            }
            if (syn.length>0){
                defar.push(`
                <div class="syn">
                <h2>Synonyms</h2>
                <p>${syn}</p>
                </div>
                `)
            }
            if (ant.length>0){
                defar.push(`
                <div class="ant">
                <h2>Antonyms</h2>
                <p>${ant}</p>
                </div>
                `)
            }
           console.lo
            defar=defar.join(" ")
            para.innerHTML=defar
            
            let sound;
           sound=new Audio("https:"+k[0].phonetics[1].audio);
            vol.addEventListener("click",()=>{
                sound.play();
            })
        })
        .catch(e=>{
            if(temp==0){
            console.log("vinay fuck me")
            vol.style.display="none"
            phone.style.display="none"
            di.style.display="none"
 para.innerHTML=`<h3>Sorry, We coudn't find the word. we are in the 
            process of adding new words daily.Sooner you will get the Defination of ${w}</h3>`      
 } })
    })
