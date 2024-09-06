import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";


const authOptions = {
    providers : [
        GithubProvider ({
            clientId: 'Iv23liVA1bPlw8KUvxUS',
            clientSecret:'0d981303d9a52af5db5237fef9293b520679ddd0' 
        })
    ],
    callbacks : {
        async session({session,token,user}){
       session.user.username = session?.user?.name
       .split("")
       .join("")
       .toLowerCase();
    
       session.user.uid = token.sub ;
       return session
        },
    },
    secret : "default_secret_key"
};
const handler = NextAuth(authOptions);
export {handler as GET , handler as POST};