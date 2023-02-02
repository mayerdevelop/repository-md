
let input = document.getElementById('input');

WIDTH = 800


input.addEventListener("change", (event) => {
    let image_file = event.target.files[0];


    let reader = new FileReader();

    reader.readAsDataURL(image_file);

    console.log(image_file)

    reader.onload = (event) => {

        image_url = event.target.result;
        let image = document.createElement('img');
        image.src = image_url;

        image.onload = (e) => {

            let canvas = document.createElement('canvas');
            let ratio = WIDTH / image.width;
            canvas.width = WIDTH;
            canvas.height = image.height * ratio;

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            let new_image_url = canvas.toDataURL('image/jpeg', 98)

             console.log("Image URL: ", new_image_url)
            
            

        } 

    }
})