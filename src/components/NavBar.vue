<template>
  <header>
    <nav>
      <router-link to="/" className="home-nav">
        <img
          id="nav-logo"
          src="https://st3.depositphotos.com/10544526/15154/v/600/depositphotos_151545494-stock-illustration-vector-image-basketball-on-fire.jpg"
        />
      </router-link>
      <div class="right_nav">
        <router-link class="view_charts" to="/charts">
          <h3>View Charts</h3>
        </router-link>
        <div className="user-nav-dropdown" v-if="currentUser">
          <button className="dropbtn">
            <!-- <div id="pfp">
                  <img src={currentUser.pfp_link} alt="pfp" />
                </div> -->
            <div id="user">
              <h3>{{ currentUser.name }}</h3>
            </div>
          </button>
          <!-- <div className="dropdown-content">
                <Link
                  to={'/profile'}
                  className="user-profile"
                  onClick={() => setProfile(true)}
                >
                  <h4>Profile</h4>
                </Link>
    
                <Link
                  to={'/profile'}
                  className="user-profile"
                  onClick={() => setProfile(false)}
                >
                  <h4>Matches</h4>
                </Link> -->
          <!-- 
                <Link to="/">
                  <h4>Logout</h4>
                </Link> -->
          <!-- </div> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
console.log(localStorage.pfp)
export default {
  name: 'NavBar',
  data: () => ({
    currentUser: {
      name: localStorage.name,
      email: localStorage.email,
      pfp: localStorage.pfp
    }
  })
}
</script>
