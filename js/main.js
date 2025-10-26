document.addEventListener('DOMContentLoaded', function(){
  const searchForm = document.getElementById('searchForm');
  if(searchForm) {
    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      const q = (document.getElementById('searchInput') || {}).value || '';
      window.location.href = 'productos.html?buscar=' + encodeURIComponent(q);
    });
  }

  document.querySelectorAll('a[href="carrito.html"]').forEach(a=>{
    a.classList.add('btn-cart-badge');
  });

});
