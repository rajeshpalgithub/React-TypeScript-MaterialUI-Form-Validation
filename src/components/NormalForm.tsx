import { useState } from 'react';
import {Button, Card, CardContent, Container, TextField, Box, FormControl} from '@material-ui/core'


interface IFormValue{
    name:string;
    email:string;
}

function NormalForm() {
    const initialValue:IFormValue = {
        name:'',
        email:''
    };
    const [formVal, setFormValue] = useState<IFormValue>(initialValue);
    const [validationError, setValidationError] = useState<any>({});
    const validate = (props:any):boolean =>{
        const target = {
            name:'',
            email:''
        };
        let isError:boolean = false;
        if( props.name === ''){
            target.name = 'Please Enter Name';
            isError = true;
        }
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(props.email === ''){
            target.email =  'Please Enter Email';
            isError = true;
        }else{
            console.log(props.email);
            if(!regExp.test(props.email)){
                target.email =  'Please Enter Valid Email';
                isError = true;
            }
        }
        setValidationError({...validationError,...target});
       
        return isError;
    }
    const handelSubmit =(event:any) =>{
        event.preventDefault();
        console.log("validate Return",validationError)
        if(!validate(formVal))
        {
            console.log('Processing Form');
        }
    }
    const handelOnChange =(event:any)=>{
        const {name,value} = event.target;
        setFormValue({
            ...formVal,
            [name]:value
        })
    }
    
    return(
        
            <Container maxWidth="xs">
                <Card >
                    <CardContent>
                        <form onSubmit={handelSubmit} autoComplete="off">
                            <FormControl fullWidth>
                                <TextField type="text"
                                name="name" 
                                value={formVal.name} 
                                onChange={handelOnChange} 
                                placeholder="Name"
                                {...(validationError.name && {error:true, helperText:validationError.name})}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField type="text"
                                    name="email"
                                    value={formVal.email} 
                                    onChange={handelOnChange} 
                                    placeholder="Email"
                                    {...(validationError.email && {error:true, helperText:validationError.email})}
                                    
                                />
                            </FormControl>
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" >Submit</Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            
            

        
    );
}

export default NormalForm;