export default function ImageGallery({ entry } : {entry: any}){
	function imageClick(e:any){
		console.log(e.target.id)

		var img = document.getElementById(e.target.id);
		var modal = document.getElementById(e.target.id.replace('-modal', '') + '-modal')
		var modalImg = document.getElementById(e.target.id + '-modalimg')

		if (modal){
			modal.classList.toggle('visible');
		}

		var span = document.getElementById(e.target.id.replace('-modal', '') + '-close');

		if (span) {
			span.onclick = function() { 
				if (modal) {
					modal.style.display = "none";
				}
			}
		}
	}
	

  return (
    <>
      {entry.gallery[0] &&
				<>
					<div className='outer outer-text w6' id="Gallery">
						<p>Gallery</p>
					</div>

					{entry.gallery.map((item:any) => {
						return(
							<>
								<div className='item w1 no-inner-padding'>
									<img className="image-zoom" src={item.url} id={item.url} onClick={imageClick}/>
								</div>
								<div id={`${item.url}-modal`} className="modal" onClick={imageClick}>
									<span className="close" id={`${item.url}-close`}>&times;</span>
									<img src={item.url} className="modal-content" id={`${item.url}-modal`}/>
								</div>
							</>
						)
					})}
				</>
			}
    </>
  );
}
