import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import authAxios from '../../axios'
import jwt from 'jwt-simple';
import s from './../../styles/LogIn.module.css'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
   return (
     <Typography variant="body2" color="textSecondary" align="center">
       {'Copyright © '}
       <Link color="inherit" href="">
         ECOMMERCE-FT06-G07
       </Link>{' '}
       {new Date().getFullYear()}
       {'.'}
     </Typography>
   );
}


export default function Login() {
  const classes = useStyles();
  
  const [blanqueo, setBlanqueo] = useState(false)

  const [input, setInput] = useState({
    email:'',
    password: '',
  })

  const[errors, setErrors] = useState({
    email:'',
    password:'',
    check:'nono'

  });    
    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            
        });        
         validate(e);  
    }

    const [input2, setInput2] = useState({
      email:'',
      password: '',
      newpass:''
    })
  
    const[errors2, setErrors2] = useState({
      email:'',
      password: '',
      newpass:'',
      check:'4'
    });    

    const handleChange2 =  (e) =>{    
            setInput2({
            ...input2,
            [e.target.name]: e.target.value,
            
        });        
        validate2(e);  
    }
    let userId;
    let newId;

    

    const email = (email) => {
      if (email === "") {
        return setErrors({...errors, email:'El email es requerido'})
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return setErrors({...errors, email :'El email es inválido'})
      }else return setErrors({...errors, email: null})
    }
    const email2 = (email) => {
      if (email === "") {
        return setErrors2({...errors2, email:'El email es requerido'})
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return setErrors2({...errors2, email :'El email es inválido'})
      }else return setErrors2({...errors2, email: null})
    }

    const password = (password) => {
      if (password === "") {
      return setErrors({...errors, password : 'Password es requerido' })
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      return setErrors({...errors, password : 'Mínimo 8 caracteres, un numero y una mayuscula'})
      }else return setErrors({...errors, password : null, check:null})
  }
  const password2 = (password) => {
    if (password === "") {
    return setErrors2({...errors2, password : 'Password es requerido' })
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    return setErrors2({...errors2, password : 'Mínimo 8 caracteres, un número y una mayúscula'})
    }else return setErrors2({...errors2, password: null})
}
const newPassword2 = (password) => {
   if (password === input2.password ) {
    return setErrors2({...errors2, newpass : 'Las contraseñas no pueden ser iguales'})
  }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)){
    return setErrors2({...errors2, newpass : 'Mínimo 8 caracteres, un número y una mayúscula'})
  }
  else return setErrors2({...errors2, newpass : null, check:null})
}



    function validate(input) {
      switch(input.target.name){
        case 'email':
          email(input.target.value)
          break;
        case 'password': 
          password(input.target.value)
          break;
      }      
    }

    function validate2(input) {
      switch(input.target.name){
        case 'email':
          email2(input.target.value)
          break;
        case 'password': 
          password2(input.target.value)
          break;
        case 'newpass': 
          newPassword2(input.target.value)
          break;
      }      
    }
    

  const handleSubmit = (e)=>{
    let newToken;
    e.preventDefault()
    authAxios.post("users/login",input)
    .then((ans)=>{
      if(ans.data.reset){
        return setBlanqueo(true)
      }else if(ans.data.ban){
        alert("usuario banneado")
      }else{
          if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
          if(decoded){
          userId= decoded.user.id
          
          }  
          newToken = jwt.decode(ans.data, "ecommerce-ft06-g07");
          if(newToken) newId = newToken.user.id

          localStorage.removeItem('token')
          localStorage.setItem('token', ans.data)

          if(userId){
            return authAxios.put("cart/updateCart/"+userId+'/'+newId)
          }else{
            return 
          }
        }
    })
    .then(ans=>{
      if(newToken) return  window.location = '/'
    })
    .catch(error=>{
        return alert("Los datos ingresados no son correctos")
    })
    setInput({
      email:'',
      password: ''
    })
  }
  const handleSubmit2 = async (e)=>{
    let newToken;
    let newId;
    e.preventDefault()
    await authAxios.post("users/resetLogin",input2)
    .then((ans)=>{
          console.log(ans.data)
          if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
          if(decoded){
          userId= decoded.user.id  
          }  
          console.log("0")
          newToken = jwt.decode(ans.data, "ecommerce-ft06-g07");
          console.log("0.5", newToken)
          if(newToken) newId = newToken.user.id
          console.log("1")
          localStorage.removeItem('token')
          console.log("2")
          localStorage.setItem('token', ans.data)
          console.log("token",localStorage.getItem('token'))
          if(userId){
            return authAxios.put("cart/updateCart/"+userId+'/'+newId)
          }else{
            return 
          }
    })
    .then(ans=>{
        window.location.assign('/')
    })
    .catch(error=>{
        alert("Los datos ingresados no son correctos")
    })
    setInput2({
      email:'',
      password: '',
      newpass: ""
    })
  }

  const handleSubmit3 =(e)=>{
    e.preventDefault()
    authAxios.get("auth/google")
    .then((ans)=>{
      console.log(ans)
    })
    .catch(err => console.log(err))

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
          blanqueo ? 
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Debe ingresar una nueva password.
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange2}
                      value = {input2.email}
                    />
                    {!errors2.email? null : <p className={s.error}>{errors2.email}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Ingrese su Password actual"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange2}
                      value = {input2.password}
                    />
                    {!errors2.password? null : <p className={s.error}>{errors2.password}</p>}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="newpass"
                      label="Ingrese su nuevo Password"
                      type="password"
                      id="newpass"
                      autoComplete="current-password"
                      onChange={handleChange2}
                      value = {input2.newpassword}
                    />
                    {!errors2.newpass? null : <p className={s.error}>{errors2.newpass}</p>}
                  </Grid>
                </Grid>
                {errors2.email || errors2.password || errors2.newpass || errors2.check ? 
                  <Button disabled 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  > 
                  Ingreso 
                  </Button> 
                    : <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit2}
                    >
                    Ingreso 
                  </Button>}
              </form>
            </div>
        :
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Ingrese a su cuenta
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value = {input.email}
                    />
                    {!errors.email? null : <p className={s.error}>{errors.email}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value = {input.password}
                    />
                    {!errors.password? null : <p className={s.error}>{errors.password}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="Me interesa recibir promociones via mail."
                    />
                  </Grid>
                </Grid>
                {errors.email || errors.password || errors.check ? 
                  <Button disabled 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  > 
                  Ingreso 
                  </Button> 
                    : <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    >
                    Ingreso 
                  </Button>}
                  <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/users/create">
                      ¿No tenés cuenta? Registrate
                    </Link>
                    <Link href="/resetPass">
                    ¿Olvidate tu contraseña? Recuperar
                    </Link>
                  </Grid>
                </Grid>
                <Grid>
                   
                      <Button type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit3}
                        >
                        Ingreso con Google Gmail
                      </Button>
                    
                </Grid>
                <Grid>
                    
                      <Button type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        >
                        Ingreso con Facebook
                      </Button>
                    
                </Grid>
              </form>
            </div>
      }
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}



