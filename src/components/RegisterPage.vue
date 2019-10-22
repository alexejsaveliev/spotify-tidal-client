<template>
<form @submit.prevent="submit">
  <label>
    <p class="label-txt">Your Name</p>
    <input type="text" class="input" required="required" v-model="user.fullName">
    <div class="line-box">
      <div class="line"></div>
    </div>
  </label>
  <label>
    <p class="label-txt">Username</p>
    <input type="text" class="input" required="required" v-model="user.username">
    <div class="line-box">
      <div class="line"></div>
    </div>
  </label>
  <label>
    <p class="label-txt">Enter your password</p>
    <input type="password" class="input" required="required" v-model="user.password">
    <div class="line-box">
      <div class="line"></div>
    </div>
  </label>
  <button type="submit" :disabled="status.registering">Register</button>
  <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
  <router-link to="/login" class="btn btn-link">Cancel</router-link>
  
</form>
</template>

<script>
    // $('.input').focus(function(){
    //     $(this).parent().find(".label-txt").addClass('label-active');
    // });

    // $(".input").focusout(function(){
    //     if ($(this).val() == '') {
    //     $(this).parent().find(".label-txt").removeClass('label-active');
    //     };
    // });

    import { mapState, mapActions } from 'vuex'

    export default {
        data(){
            return {
                user: {
                    username: '',
                    password: '',
                    fullName: ''
                },
                submitted: false
            }
        },
        methods: {
            ...mapActions('account', ['register']),
            submit(){
                this.submitted = true
                this.register(this.user)
            }
        },
        computed: {
            ...mapState('account', ['status'])
        }
    }
</script>


<style scoped>

form {
    width: 60%;
    margin: 60px auto;
    background: #efefef;
    padding: 60px 120px 80px 120px;
    text-align: center;
    -webkit-box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
    box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
}
label {
    display: block;
    position: relative;
    margin: 40px 0px;
}
.label-txt {
    position: absolute;
    top: -1.6em;
    padding: 10px;
    font-family: sans-serif;
    font-size: .8em;
    letter-spacing: 1px;
    color: rgb(120,120,120);
    transition: ease .3s;
}
.input {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
}

.line-box {
    position: relative;
    width: 100%;
    height: 2px;
    background: #BCBCBC;
}

.line {
    position: absolute;
    width: 0%;
    height: 2px;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    background: #8BC34A;
    transition: ease .6s;
}

.input:focus + .line-box .line {
    width: 100%;
}

.label-active {
    top: -3em;
}

button {
    display: inline-block;
    padding: 12px 24px;
    background: rgb(220,220,220);
    font-weight: bold;
    color: rgb(120,120,120);
    border: none;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    transition: ease .3s;
}

button:hover {
    background: #8BC34A;
    color: #ffffff;
}

.form--no {
    animation: NO 1s ease-in-out;
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

</style>
