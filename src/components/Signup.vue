<template>
 <div class="vue-tempalte">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Sign Up</h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" v-model="user.firstName" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.firstName.$error }" />
                                <div v-if="submitted && !$v.user.firstName.required" class="invalid-feedback">First Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" v-model="user.lastName" id="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.lastName.$error }" />
                                <div v-if="submitted && !$v.user.lastName.required" class="invalid-feedback">Last Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                    <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                                <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                                    <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" v-on:click.prevent="PostReq">Sign Up</button>
                                <p class="forgot-password text-right">
                                    Already registered 
                                    <router-link :to="{name: 'login'}">sign in?</router-link>
                                </p>
                                
                            </div>
                            <p style="color:red">
                                    {{msg}}
                                </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
    export default {
        name:"app",
        data() {
            return {
                msg: "",
                user:
                {
                    email : "",
                    password : "",
                    firstName : "",
                    lastName : "",
                    confirmPassword : ""
                },
                submitted: false
            };
        },

        validations: {
            user: {
                firstName: { required },
                lastName: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confirmPassword: { required, sameAsPassword: sameAs('password') }
            }
        },
        methods:{

            handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
            },
            
            PostReq: function()
            {
    
                if (this.user.email) {
                this.$http.post("http://localhost:8081/register",this.user, {"content-type": "application/json" })
                    .then(function(response){
                    console.log(response.bodyText);
                    this.msg=response.bodyText
                    })
                    .catch(e => { 
                        this.msg=e.bodyText;
                        console.log(e); })
                }
            
            }
        }
    };
</script>
