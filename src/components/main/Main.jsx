import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
import { GitBranch, Star } from 'react-feather'
// import logo from '../../assets/logo.jfif'

const languageList = [
  'ABAP',
  'ActionScript',
  'Ada',
  'Apex',
  'Assembly',
  'C',
  'C#',
  'C++',
  'Clojure',
  'COBOL',
  'CoffeeScript',
  'Dart',
  'Delphi',
  'Elixir',
  'Elm',
  'Erlang',
  'Fortran',
  'Go',
  'Groovy',
  'Haskell',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'LabVIEW',
  'Lisp',
  'Lua',
  'MATLAB',
  'Objective-C',
  'Pascal',
  'Perl',
  'PHP',
  'PowerShell',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'Scala',
  'Scheme',
  'Shell',
  'Swift',
  'TypeScript',
  'VB.NET',
  'Verilog',
  'VHDL',
  'Visual Basic',
  'XML'
];



export default function Main() {
  const [repos, setRepos ] = useState([]);
  const [langugefilter, setLanguageFilter ] = useState('');


  //fetching more trending repo 
      useEffect(()=>{
          const TOKEN = process.env.EACT_APP_GITHUB_PAT;
          


          async function fetchTrendingRepos() {
              const headers = {
                  'Authorization': `token ${TOKEN}`,
                  'Accept': 'application/vnd.github.v3+json'
              };


              //type check if type is trending then fetch most trending 
              //if type is starred than fetch most starred project

          let params ;

          if(langugefilter === 'default'){
            params = new URLSearchParams({
                  'q' : 'created:>2024-06-01',
                  'sort': 'stars',
                  'order': 'desc',
                  'per_page': 40
            });

          } else {
            params = new URLSearchParams({
                    'q' : `created:2023-06-01..2023-06-10 language:${langugefilter}`,
                    'sort': 'stars',
                    'order': 'desc',
                    'per_page': 20
                });
          }

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
        },[langugefilter]);

        const handleLanguageFilterChange = (e) => {
          setLanguageFilter(e.target.value);
        };

  return (
    <div className='main'>
      <p className='heading'>Find The most <span className='span_ele'>Trending</span> Github Repositeries Every Week</p>
      
      <div className='category'>

      <p className='date_title' >This Week Data:<p className='data_section'>12-06-2024 to 18-06-2024</p> </p>

          <div className='language_option'>

            <label for="options" className='labels'>Filter :</label>
              <select className='options' name='options' value={langugefilter} onChange={handleLanguageFilterChange}>
              <option value=''>All Languages</option>
              {languageList.map((lang, index) => (
              <option key={index} value={lang}>{lang}</option>
              ))}
              </select>
          </div>
      </div>

      <div className ='github_profiles_from_api'>
        
             {repos.map((repo,id) => (
                <div className="profile_component" key={id} >
                    <div className="firstpart">
                        <p className='github_username' onClick={()=> window.open(repo.html_url)}>{repo.full_name}</p> 
                        <p className='built_by'>Built by: {repo.owner.login} <span className='built_by pl-3 text-xs'>{repo.created_at}</span> </p>
                        {/* <p className='built_by'>{repo.created_at}</p> */}
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
            ))}
                
      </div>
    </div>
  )
}