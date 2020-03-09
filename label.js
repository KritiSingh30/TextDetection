
    //REQUEST AND RESPONSE FROM VISION API

        function showResponse(contents){
                //var imageSent = document.getElementById("result").textContent;
                //var data = JSON.stringify({"requests":[{"image":{"source":{"imageUri":"gs://image-version-project-v1/img2.jpg"}},"features":[{"type":"LABEL_DETECTION","maxResults":1}]}]});
               // var data = JSON.stringify({"requests":[{"image":{"source":{"imageUri":"gs://image-version-project-v1/img2.jpg"}},"features":[{"type":"TEXT_DETECTION","maxResults":1}]}]});
                const data = JSON.stringify({"requests":[{"image":{"content":`${contents}`},"features":[{"type":"TEXT_DETECTION","maxResults":1}]}]});
                //var data = JSON.stringify({"requests":[{"features":[{"type":"TEXT_DETECTION","maxResults":1}],"image":{"source":{"imageUri":`${imageSent}`}}}]});         
                //---var data = JSON.stringify({"requests":[{"image":{"source":{"imageUri":"gs://image-version-project-v1/img2.jpg"}},"features":[{"type":"TEXT_DETECTION","maxResults":1}]}]});
                var xhr = new XMLHttpRequest();
                //xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                }
                });
                
                xhr.open("POST", "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAgKoAsY740EfT73y6wZgLHCIWTe8HvFUo");
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.send(data);  

                xhr.onreadystatechange = processRequest;

                function processRequest(e){
                    if(xhr.readyState == 4 && xhr.status == 200){
                        //alert(xhr.responseText);
                        var data = JSON.parse(xhr.responseText);
                        var el_down = document.
                        ("imagecontainer__results-resultlabels"); 
                        var data_response = data.responses[0];
                        var text_result = data_response.textAnnotations[0];
                        el_down.innerHTML = JSON.stringify(text_result.description.replace("\n"," "));
                    }
                }
            }
    //DISPLAY IMAGE ON SCREEN
            const loadFile = function(event) {
                const image = document.getElementById('output');
                image.src = URL.createObjectURL(event.target.files[0]);
                };
    //BASE ENCODE THE UPLOADED IMAGE
            const fileDataURL = file => new Promise((resolve,reject) => {
                let fr = new FileReader();
                fr.onload = () => resolve( fr.result);
                fr.onerror = reject;
                fr.readAsDataURL( file)
            });
            
            function showResult(file) {
                fileDataURL( file)
                .then( data => showResponse(data.slice(23)))
                .catch(err => console.log(err));
            }
    //TEST FUNCTION        
            function printdata(data){
                    console.log(data);
            }
