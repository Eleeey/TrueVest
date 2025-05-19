const Layout =({children}: {children:React.ReactNode})=>{
    return(
        <div className=" flex flex-center min-h-screen bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center space-around">
            {children}
        </div>
    )
}

export default Layout
