import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
// import { Star } from 'react-feather'
// import logo from '../../assets/logo.jfif'


export default function Main() {
  const [repos, setRepos ] = useState([]);
  const [langugeUsed, setLanguageUsed ] = useState('default');


  //fetching more trending repo 
      useEffect(()=>{
          const TOKEN = process.env.EACT_APP_GITHUB_PAT;


          async function fetchTrendingRepos() {
              const headers = {
                  'Authorization': `token ${TOKEN}`,
                  'Accept': 'application/vnd.github.v3+json'
              };

              // const params = new URLSearchParams({
              //     'q' : 'created:>2024-06-01',
              //     'sort': 'stars',
              //     'order': 'desc',
              //     'per_page': 15
              // });

              //type check if type is trending then fetch most trending 
              //if type is starred than fetch most starred project

          let params ;

          if(langugeUsed === 'default'){
            params = new URLSearchParams({
                  'q' : 'created:>2024-06-01',
                  'sort': 'stars',
                  'order': 'desc',
                  'per_page': 20
            });

          } else {
            params = new URLSearchParams({
                    'q' : `created:2023-06-01..2023-06-10 language:${langugeUsed}`,
                    'sort': 'stars',
                    'order': 'desc',
                    'per_page': 18
                });
          }

          //     if (type === 'trending'){
          //       params = new URLSearchParams({
          //         // 'q':'created_at:%3E2023-01-01',
          //         // 'q': 'stars:>1',
          //         'q' : 'created:>2024-06-01',
          //         'sort': 'stars',
          //         'order': 'desc',
          //         'per_page': 15
          //     });

          //   } else if (type === 'starred'){
          //       params = new URLSearchParams({
          //       'q' : 'created:>2023-06-01',
          //       'sort': 'stars',
          //       'p': 'stars:>50000',
          //       'order': 'desc',
          //       'per_page': 15
          //   });
          // }
               const url = `https://api.github.com/search/repositories?${params}`;

              try {
                  const response = await fetch(url, { headers });

                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  const data = await response.json();
                  setRepos(data.items)
                  // console.log(data.items)

                  // Log rate limit information
                  console.log(`Rate Limit Remaining: ${response.headers.get('X-RateLimit-Remaining')}`);
                  console.log(`Rate Limit Reset: ${new Date(response.headers.get('X-RateLimit-Reset') * 1000)}`);

              } catch (error) {
                  console.error('Fetch Error:', error);
              }
          }

          // Call the function
            fetchTrendingRepos();
        },[langugeUsed]);

    // function handleFetchSearch(type){
    //   setFetchType(type)
    // };

  return (
    <div className='main'>
      <p className='heading'>Find The most <span className='span_ele'>Trending</span> Github Repositeries Every Week</p>
      
      <div className='category'>

      <p className='date_title' >This Week Data:<p className='data_section'>12-06-2024 to 18-06-2024</p> </p>

          <div className='language_option'>
            <label for="options" className='labels'>Filter :</label>
              <select className='options' name='options' value={langugeUsed} onChange={(e)=> setLanguageUsed(e.target.value)}>
                <option>default</option>
                <option>python</option>
                <option>typescript</option>
                <option>javascript</option>
                <option>java</option>
              </select>
          </div>
      </div>

      <div className ='github_profiles_from_api'>
        
             {repos.map((repo,id) => (
                <div className="profile_component" key={id} >
                    <div className="firstpart">
                        <p className='github_username'>{repo.full_name}</p> 
                        <p className='built_by'>Built by: {repo.name} <span className='built_by'>{repo.created_at}</span></p>
                        {/* <p className='built_by'>{repo.created_at}</p> */}
                        <p className='github_project_description'>{repo.description}</p>

                        <div>
                          <p className='language_used'>{repo.language} <span className='language_used'>{repo.stargazers_count} </span><span className='language_used'>{repo.forks_count} </span> <span className='language_used'>{repo.watchers_count} </span></p>
                          {/* <p className='language_used'>{repo.stargazers_count} <Star size={13}/></p> */}
                        </div>

                    </div>

                      <div className='secondpart'>
                        <img src={repo.avatar_url} width={80} height={80} alt='profileimg' />
                      </div>   
                </div>
            ))}
                

                {/* <div className="profile_component" >
                    <div className="firstpart">
                        <p className='github_username'>full_name /username</p> 
                        <p className='built_by'>built by: name <span className='built_by'>created_at</span></p>
                        
                        <p className='github_project_description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, harum. Alias labore suscipit porro odio, repellat esse sunt. Odio commodi nulla aperiam odit mollitia consectetur voluptas eaque impedit enim molestiae?</p>

                        <div>
                        <p className='language_used'>language <span className='language_used'>stargazers_count </span><span className='language_used'>forked </span></p>
                        </div>

                      </div>

                      <div className='secondpart'>
                        <img src={logo} width={100} height={100} alt='profileimg' />
                      </div>   
                </div> */}
      </div>
    </div>
  )
}