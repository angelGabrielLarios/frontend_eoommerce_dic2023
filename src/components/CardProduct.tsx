import { NavLink } from 'react-router-dom';
import { IProductsReponse } from '../API';
import { convertToCurrency } from '../helpers';




interface Props extends IProductsReponse { }

export const CardProduct = ({ name, price, id, imageURL, section }: Props) => {

    return (
        <>
            <article className="card w-full bg-base-300 shadow-xl animate-fade-down" id={id}>
                <figure>

                    <img src={imageURL} alt={`image of ${name}`} className="block w-full h-52 object-cover" />


                </figure>
                <div className="card-body space-y-2 p-4">

                    <h2 className="card-title text-base leading-normal truncate h-12">
                        {name}
                    </h2>


                    <p className="badge badge-secondary">{convertToCurrency({ amount: price, locales: 'es-MX', currencyCode: 'MXN' })}</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-primary badge-outline">{section.name}</div>
                    </div>


                    <NavLink
                        to={`/product/${id}`}
                        className="btn btn-primary">Ver mas
                    </NavLink>




                </div>
            </article>
        </>
    );
};
