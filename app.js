const findUser = async () => {
  const username = document.getElementById('username').value.trim();
  const userCard = document.getElementById('userCard');
  userCard.innerHTML = '';

  if (username === '') {
    userCard.innerHTML = ' <div class="alert alert-warning text-center  text-warning">Please Enter a uses !</div>';
    return;
  }

  
  userCard.innerHTML = `
    <div class="custom-loader-wrapper">
   <div class="spinner-border text-dark" role="status">
  <span class="visually-hidden p-5">Loading...</span>
</div>
    </div>
  `;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      userCard.innerHTML = ` <div class="alert alert-danger text-center text-danger">User Not Found</div>`;
      return;
    }

    const user = await response.json();

    userCard.innerHTML = `
      <div class="card p-4 text-center">
        <img src="${user.avatar_url}" class="user-img mx-auto mb-3 rounded-circle" width="120" height="120" />
        <h5>${user.name || user.login}</h5>
        <p><strong>Location:</strong> ${user.location || 'Not Available'}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <a href="${user.html_url}" target="_blank" class="btn btn-custom mt-2">View GitHub Profile</a>
      </div>
    `;
  } catch (error) {
    userCard.innerHTML = `<div class="alert alert-danger text-center"> Network problem</div>`;
  }
};
