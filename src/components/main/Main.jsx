import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
import { GitBranch , Heart, Star } from 'react-feather'
import { MessageCircle  } from 'react-feather'
// import logo from '../../assets/logo.jfif


export default function Main() {
  //for github
  const [repos, setRepos ] = useState([]);
  //for producthunt
  const [producthuntData ,setProductHuntData] = useState([]);
  //for languagefilter
  // const [langugefilter, setLanguageFilter ] = useState('');
  //for setting types 
  const [type , setType] = useState('Github')
  // for setting date for product hunt cuurent setted date is - 1 june 2024 and the next date will be sent by setdate
  // const [date, setDate] = useState("2024-06-1T00:00:00Z")
  


  //fetching more trending repo 
      useEffect(()=>{

        if(type === 'Github'){
          async function fetchTrendingRepos() {
            const TOKEN = process.env.REACT_APP_GITHUB_API_KEY;
              const headers = {
                  'Authorization': `token ${TOKEN}`,
                  'Accept': 'application/vnd.github.v3+json'
            };

            const params  = new URLSearchParams({
                  'q' : 'created:>2024-06-10',
                  'sort': 'stars',
                  'order': 'desc',
                  'per_page': 20
            });

            // } else {
            //     params = new URLSearchParams({
            //         'q' : `created:2023-06-01..2023-06-10 language:${langugefilter}`,
            //         'sort': 'stars',
            //         'order': 'desc',
            //         'per_page': 20
            //     });
            // }

            const url = `https://api.github.com/search/repositories?${params}`;

            try {
                  const response = await fetch(url, { headers });

                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  const data = await response.json();
                  console.log("github data is being fetched here")
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

        } else if ( type === 'ProductHunt') {
             async function fetchtrendingProductHunt(){

              const accessToken =  process.env.REACT_APP_PRODUCT_HUNT_TOKEN;

              const headers = {
                      'Authorization': `Bearer ${accessToken}`,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    };


                    // postedBefore: "2024-06-10T23:59:59Z" if i do this then i will get all the data before 10 may 2024
              const query = `
                    {
                      posts(
                        first: 20, 
                        order: VOTES, 
                        postedAfter: "{2024-06-20T00:00:00Z}", 
                      ) {
                        edges {
                          node {
                            id
                            name
                            tagline
                            url
                            votesCount
                            commentsCount
                            createdAt
                            thumbnail {
                                url
                            }
                            user {
                                name
                                profileImage
                            }
                          }
                        }
                      }
                    }
                    `;




                  try {

                    const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
                      method: 'POST',
                      headers: headers,
                      body: JSON.stringify({ query: query })
                    })

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    } 

                    const data = await response.json()
                    console.log("product hunt data is fetched")
                    // console.log(data);
                    setProductHuntData(data.data.posts.edges)
                    
                  } catch (error) {
                    console.error(error)
                  }

               
              }
              fetchtrendingProductHunt();
            }
          },[type])

        // },[langugefilter]);

        // const handleLanguageFilterChange = (e) => {
        //   setLanguageFilter(e.target.value);
        // }

  return (
    <div className='main'>
      <p className='heading'>Find The most <span className='span_ele'>Trending</span> <br /> <span className='nee_element'> Github <span className='repo'>Repos/</span> ProductHunt <span className='product'>products</span> Every Week... </span></p>
      
      <div className='category'>

      <p className='date_title' >This Week Data:<p className='data_section'>12-06-2024 to 18-06-2024</p> </p>

          {/* <div className='language_option'>

            <label for="options" className='labels'>Filter :</label>
              <select className='options' name='options' value={langugefilter} onChange={handleLanguageFilterChange}>
              <option value=''>Default</option>
              {languageList.map((lang, index) => (
              <option key={index} value={lang}>{lang}</option>
              ))}
              </select>
          </div> */}

          <div className='searchtype' >
            <button onClick={() => setType('Github')} className='github_btn active' >Github</button>
            <button onClick={() => setType('ProductHunt')} className='producthunt_btn ' >Product-Hunt</button>
          </div>


      </div>


      <div className ='github_profiles_from_api'>

        { type === 'Github'? ( repos.map((repo,id) => (
                 <div className="profile_component" key={id} >
                    <div className="firstpart">
                        <p className='github_username' onClick={()=> window.open(repo.html_url)}>{repo.full_name}</p> 
                        <p className='built_by'>Built by: {repo.owner.login} <span className='built_by pl-3 text-xs'>{repo.created_at}</span> </p>
                        <p className='github_project_description'>{repo.description}</p>

                        <div className='flex' style={{ backgroundColor : '#1E1E1E'}}>
                          <p className='language_used'>{repo.language} </p>
                          <Star className='mt-6 ml-5 mr-1'  size={9}/>
                          <p className='star_count mt-1 pr-3  '>{repo.stargazers_count} </p> 
                          <GitBranch className='mt-6 ml-2 mr-1' size={9}/>
                          <p className='fork_count mt-5'>{repo.forks_count} </p>
                          
                         
                        </div>

                    </div>

                      <div className='secondpart'>
                        <img src={repo.owner.avatar_url} width={80} height={80} alt='profileimg' className='secondPartImg' />
                      </div>   
                </div>
            ))
          ) : (producthuntData.map((product,productid) => (
            <div className="profile_component" key={productid} >
              <div className="firstpart">
                  <p className='github_username' onClick={()=> window.open(product.node.url)}>{product.node.name}</p> 
                  <p className='built_by'>Built by: owner name<span className='built_by pl-3 text-xs'>{product.node.createdAt}</span> </p>
                  <p className='github_project_description'>{product.node.tagline}</p>

                  <div className='flex' style={{ backgroundColor : '#1E1E1E'}}>
                          <Heart className='mt-6 mr-1' size={9}/>
                          <p className='star_count mt-1 pr-3  '>{product.node.votesCount} </p> 
                          
                          <MessageCircle className='mt-6 ml-2 mr-1'  size={9}  id='producthunt-second-image'/>
                          <p className='star_count mt-1 pr-3  '>{product.node.commentsCount} </p> 
                          
                  </div>
              </div>

              <div className='secondpart'>
                 <img src={product.node.thumbnail.url} width={120} height={120} alt='profileimg' className='secondPartImg' />
              </div>

            </div>
          ))
            )}
                
      </div>
    </div>
  )
}