<template>
    <div class="contact">
        <div class="container text-white bg-transparent with-blur-backdrop rounded">
            <h1 class="text-center contactMain">CONTACT US:</h1>
            <form action="https://formspree.io/f/mgvwwenn" class="row g-3" method="POST" target="_blank">
                <div data-aos="fade-down" class="col-md-6 order-md-2">
                    <img src="https://aneeqbass.github.io/ecommerceImages/contactImg.jpg" class="img-thumbnail cont-img"
                        alt="">
                </div>
                <div data-aos="fade-up" class="col-md-6 order-md-1">
                    <label for="inputName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="inputName" name="First Name" required>
                    <label for="inputLastName" class="form-label">Surname</label>
                    <input type="text" class="form-control" id="inputLastName" name="Surname" required>
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail" name="Email" required
                        placeholder="example@gmail.com">
                    <label for="inputMessage">Send Us A Message</label>
                    <textarea class="form-control" name="message" placeholder="Type message..." required></textarea>
                    <br>
                    <button class="form-control submitBnt">Submit</button>
                    <br><br>
                    <div class="">
                        <br>
                        <h4>Contact Us</h4>
                        <li>Phone: 021 345 6789</li>
                        <li>Email: techfit@gmail.com</li>
                        <li>Location: Cape Town</li>
                        <div class="d-flex justify-content-evenly p-2">
                            <li><i class="bi bi-facebook"></i></li>
                            <li><i class="bi bi-linkedin fa-6x"></i></li>
                            <li><i class="bi bi-twitter"></i></li>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.contact {
    margin-top: 120px;
    width: 100%;
    list-style: none;
}
</style>