import { loginSchematype, registerSchematype } from "../schema/auth.schema";

export async function register(Form:registerSchematype){
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Form),
    })
    const data = await response.json()
return(data);
}
export async function login(Form:loginSchematype){
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Form),
    })
    const data = await response.json()
return(data);
}