<template>
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" placeholder="you@example.com" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                                </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" placeholder="Password"  />
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                </div>
                                </div>

            <button type="submit" @click.prevent="LoginReq" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p style="color:red; padding-top:10px">{{msg}}</p>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            
             <p class="signup text-left mt-2 mb-4">
                Not Registered!
                <router-link :to="{name: 'signup'}">SignUp?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form>
    </div>
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";
  
    export default {
        name:'Login',
        data() {
            return {
                msg: "",
                user:
                    {
                        email : "",
                        password : "",
                    }
                }
        },
        validations: {
            user: {
                email: { required, email },
                password: { required },
            }
        },
        methods:{
           
                 LoginReq:function()
                 {
    
                this.$http.post("http://localhost:8082/login",this.user, {"content-type": "application/json" })
                    .then(function(response){
                    this.msg=response.bodyText
                    console.log(this.msg)
                    if (response.status === 200) {
                        
                        this.$session.start()
                         this.$store.commit("setAuthentication",true);
                       this.$router.replace({name:"home-page"});
                  
                        
                        }
                    })
                    .catch(e => { 
                        this.msg=e.bodyText;
                        console.log(e); })
            
            }
        

            },
            handleSubmit() 
            {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) 
                {
                    return;
                }

                alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
            }
        }
    
    
           
</script>