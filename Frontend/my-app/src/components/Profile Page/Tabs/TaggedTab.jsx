import React from 'react'

function TaggedTab() {
  return (
    <div style={{display:'grid',gridGap:'5px',gridTemplateRows:'repeat(3, 1fr)',gridTemplateColumns:'repeat(3, 1fr)'}} className=''>

<div class="card">
  <img class="card-img-top" src="..." alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary">Go somewhere</button>
  </div>
</div>
<div class="card">
  <img class="card-img-top" src="..." alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary">Go somewhere</button>
  </div>
</div>    <div class="card">
  <img class="card-img-top" src="..." alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary">Go somewhere</button>
  </div>
</div>
<div class="card">
  <img class="card-img-top" src="..." alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary">Go somewhere</button>
  </div>
</div>
    </div>
  )
}

export default TaggedTab