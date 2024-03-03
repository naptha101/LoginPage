export default function profile2({params}:any){
    return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
        <div>
            <h1>Profile Photo {params.id}</h1>
        </div>
    
    </div>
    
    );
    
    }