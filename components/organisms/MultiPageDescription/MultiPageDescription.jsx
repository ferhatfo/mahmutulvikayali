export default function MultiPageDescription({description}){
    return(
        <section className="pt-[50px] pb-[20px]  md:pb-0">
            <div className="container mx-auto px-4">
                <p className="md:max-w-[45%] pb-[15px] text-gray-700 leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </section>
    )
}