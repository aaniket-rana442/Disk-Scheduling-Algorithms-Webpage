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

    if (!form) return;

    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        exe_seq = []; // reset execution sequence

        let userseq = document.getElementById("sequence").value;
        let curr = parseInt(document.getElementById("head").value, 10);
        let name = document.getElementById("algo").value;
        let direction = (document.querySelector('input[name="side"]:checked')?.value || "RIGHT").toLowerCase();
        let diskSize = 200;
        let arr = userseq.split(",").map(ele=>parseInt(ele.trim(),10));
        let time = 0;
// for FCFS
        if(name === "FCFS"){
            exe_seq.push(curr);
            for(let i of arr){
                time += Math.abs(curr - i);
                curr = i;
                exe_seq.push(i);
            }
        }

        console.log("Total seek time:", time);
// for SSTF
        if(name=="SSTF"){
            let requests = [...arr];
            exe_seq.push(curr);

            while (requests.length > 0) {
                let closest = requests.reduce((prev, currReq) =>
                    Math.abs(currReq - curr) < Math.abs(prev - curr) ? currReq : prev
            );

            time += Math.abs(curr - closest);
            curr = closest;
            exe_seq.push(closest);

            requests = requests.filter(req => req !== closest);
        }
        }
// for LOOK
        if(name=="LOOK"){
            exe_seq.push(curr);

            let left = arr.filter(x => x < curr).sort((a, b) => b - a);
            let right = arr.filter(x => x >= curr).sort((a, b) => a - b);

            if (direction === "right") {
                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }
                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }
            } else {
                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }
                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }
            }
        }
// for C-LOOK
        if(name=="CLOOK"){
            exe_seq.push(curr);

            let left = arr.filter(x => x < curr).sort((a, b) => a - b);
            let right = arr.filter(x => x >= curr).sort((a, b) => a - b);

            if (direction === "right") {
                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }

                if (left.length > 0) {
                    time += Math.abs(curr - left[0]);
                    curr = left[0];
                    exe_seq.push(curr);

                    for (let i = 1; i < left.length; i++) {
                        time += Math.abs(curr - left[i]);
                        curr = left[i];
                        exe_seq.push(curr);
                    }
                }
            } else {
                left = left.sort((a, b) => b - a);
                right = right.sort((a, b) => b - a);

                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }

                if (right.length > 0) {
                    time += Math.abs(curr - right[0]);
                    curr = right[0];
                    exe_seq.push(curr);

                    for (let i = 1; i < right.length; i++) {
                        time += Math.abs(curr - right[i]);
                        curr = right[i];
                        exe_seq.push(curr);
                    }
                }
            }
        }
// for SCAN
        if(name=="SCAN"){
            exe_seq.push(curr);

            let left = arr.filter(x => x < curr).sort((a, b) => b - a);
            let right = arr.filter(x => x >= curr).sort((a, b) => a - b);

            if (direction === "right") {
                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }
                time += Math.abs(curr - (diskSize - 1));
                curr = diskSize - 1;

                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }
            } else {
                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }
                time += Math.abs(curr - 0);
                curr = 0;

                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }
            }
        }
// for C-SCAN
        if(name=="CSCAN"){
            exe_seq.push(curr);

            let left = arr.filter(x => x < curr).sort((a, b) => a - b);
            let right = arr.filter(x => x >= curr).sort((a, b) => a - b);

            if (direction === "right") {
                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }

                time += Math.abs(curr - (diskSize - 1));
                curr = 0;
                time += diskSize - 1;

                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }
            } else {
                left = left.sort((a, b) => b - a);
                right = right.sort((a, b) => b - a);

                for (let l of left) {
                    time += Math.abs(curr - l);
                    curr = l;
                    exe_seq.push(l);
                }

                time += Math.abs(curr - 0);
                curr = diskSize - 1;
                time += diskSize - 1;

                for (let r of right) {
                    time += Math.abs(curr - r);
                    curr = r;
                    exe_seq.push(r);
                }
            }
        }

        if(p1) p1.innerText = `Total number of tracks movement (Seek Time): ${time}`;
        if(p2) p2.innerText = `Sequence of execution: ${exe_seq.join(" -> ")}`;
        if(p3) p3.innerText = `Average Seek Time: ${(time / arr.length).toFixed(2)}`;
    });
});
