import { IProductsReponse } from '../API';
import { convertToCurrency } from '../helpers';
import { Toaster } from 'react-hot-toast';
import { LoadingComponent } from './LoadingComponent';
import { useCardProductView } from '../hooks';

interface Props extends IProductsReponse { }

export const CardProductView = ({ name, price, id, imageURL, section, description }: Props) => {


    const { isLoading, onClickAddToCart, profile } = useCardProductView()



    return (
        <>
            <div className="card w-full bg-base-300 shadow-xl animate-fade-down" id={id}>
                <figure>


                    <img src={imageURL} alt={`image of ${name}`} className="block w-full h-52 object-cover" />


                </figure>
                <div className="card-body space-y-2 p-4">


                    <h2 className="card-title text-base leading-normal ">
                        {name}
                    </h2>
                    <p className="badge badge-secondary">{convertToCurrency({ amount: price, locales: 'es-MX', currencyCode: 'MXN' })}</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-primary badge-outline">{section.name}</div>
                    </div>

                    <p className='text-sm'>
                        <span className='font-bold'>Descripcion: </span>{description}
                    </p>


                    <button
                        disabled={isLoading}
                        type='button'
                        className="btn btn-primary"
                        onClick={() => {
                            onClickAddToCart({
                                idProduct: id,
                                idUser: profile?.id || ``
                            })
                        }}
                    >Agregar al carrito
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg>

                        <LoadingComponent
                            show={isLoading}
                            size='loading-xs'
                        />
                    </button>


                </div>
            </div>


            <Toaster
                position="bottom-right"
                toastOptions={
                    {
                        style: {
                            backgroundColor: '#131616',
                            padding: '0px'
                        }
                    }
                }
            />
        </>
    );
};
