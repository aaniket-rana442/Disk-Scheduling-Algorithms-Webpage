document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("dropdownbtn-2");
    let menu = document.getElementById("dropdownMenu-2");

    if(btn && menu){
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            menu.classList.toggle("show");
        });

        window.addEventListener("click", function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove("show");
            }
        });
    }

    // Stimulation process
    let p1 = document.querySelector("#seektime");
    let p2 = document.querySelector("#executionseq");
    let p3 = document.querySelector("#avg");
    let exe_seq = [];
    let form = document.querySelector("#algoform");

    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        exe_seq = []; // reset execution sequence

        let userseq = document.getElementById("sequence").value;
        let curr = parseInt(document.getElementById("head").value, 10);
        let name = document.getElementById("algo").value;
        let arr = userseq.split(",").map(ele=>parseInt(ele.trim(),10));
        let time = 0;

        if(name === "FCFS"){
            exe_seq.push(curr);
            for(let i of arr){
                time += Math.abs(curr - i);
                curr = i;
                exe_seq.push(i);
            }
        }

        console.log("Total seek time:", time);

        if(p1) p1.innerText = `Total number of tracks movement (Seek Time): ${time}`;
        if(p2) p2.innerText = `Sequence of execution: ${exe_seq.join(" -> ")}`;
        if(p3) p3.innerText = `Average Seek Time: ${(time / arr.length).toFixed(2)}`;
    });
});
