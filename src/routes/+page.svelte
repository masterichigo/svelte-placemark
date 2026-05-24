<script>
  // You can import any required stores or components here.
  // For a basic landing page, standard HTML/Bulma routing is sufficient.
</script>


<section class="hero is-fullheight is-light">
  <!-- Top Navigation -->
  <div class="hero-head">
    <nav class="navbar py-2">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <span class="is-size-4 has-text-weight-bold has-text-primary">📍 PlaceMark</span>
          </a>
        </div>
        
        <!-- Navbar Right Side (Login / Sign Up) -->
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a href="/login" class="button is-light">
                  Log In
                </a>
                <a href="/signup" class="button is-primary">
                  <strong>Sign Up</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- Main Hero Content -->
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        
        <!-- Left Column: Text & Call to Action -->
        <div class="column is-6 pr-6">
          <h1 class="title is-1 has-text-weight-extrabold has-text-dark">
            Map Your World. <br>
            <span class="has-text-primary">Save Your Spots.</span>
          </h1>
          <h2 class="subtitle is-4 mt-4 has-text-grey-dark">
            PlaceMark is the ultimate tool to create, manage, and share your favorite Points of Interest (POIs) with friends and fellow explorers.
          </h2>
          
          <div class="buttons mt-6">
            <a href="/signup" class="button is-primary is-large is-rounded">
              Start Mapping For Free
            </a>
            <a href="/login" class="button is-white is-large is-rounded has-text-primary">
              Log In to Account
            </a>
          </div>
        </div>

        <!-- Right Column: Static Image -->
        <div class="column is-6">
          <figure class="image">
            <!-- 
              This assumes you have an image named 'poi-hero.jpg' 
              located in the root of your 'static' folder. 
            -->
            <img 
              src="/poi-hero.jpg" 
              alt="Map showing various Points of Interest" 
              class="hero-image" 
            />
          </figure>
        </div>
        
      </div>
    </div>
  </div>
</section>

<style>
  /* Custom styling to complement Bulma */
  .hero-image {
    border-radius: 1rem;
  }
</style>