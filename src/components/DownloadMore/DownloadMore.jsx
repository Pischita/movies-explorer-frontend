import './DownloadMore.css';

export default function DownloadMore({onDownloadMore}){
    function handleClick(){
        onDownloadMore();
    }

    return (<div className='download-more'>
        <button type='button' className="download-more__button" onClick={handleClick}>Ещё</button>
    </div>);
}