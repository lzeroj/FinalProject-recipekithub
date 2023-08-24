//package org.kosta.recipekithub.webcontroller;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.kosta.recipekithub.model.vo.GoogleLoginResponse;
//import org.kosta.recipekithub.model.vo.GoogleOAuthRequest;
//import org.kosta.recipekithub.model.service.GoogleOAuthService;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponentsBuilder;
//import org.springframework.web.servlet.View;
//import com.cleopatra.spring.JSONDataView;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Controller
//@RequiredArgsConstructor
//@Slf4j
//@RequestMapping("/login")
//public class ApiRestController {
//
//    private final GoogleOAuthService googleOAuthService;
//
//    // ---[ Get Google Auth URL ]---//
//    @RequestMapping("/getGoogleAuthUrl")
//    public View getGoogleAuthUrl(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        String reqUrl = googleOAuthService.getAuthUrl();
//        
//        log.info("myLog-LoginUrl : {}", reqUrl);
//        // Logic to set the response and redirect...
//        return new JSONDataView();
//    }
//
//    // ---[ OAuth Google Check ]---//
//    @RequestMapping("/oauth_google_check")
//    public View oauth_google_check(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        String authCode = request.getParameter("code");
//        String resultJson = googleOAuthService.authenticateUser(authCode);
//        
//        log.info("responseBody {}", resultJson);
//        // Logic to set the response...
//        return new JSONDataView();
//    }
//}



package org.kosta.recipekithub.webcontroller;

import java.net.URI;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.kosta.recipekithub.model.vo.GoogleLoginResponse;
import org.kosta.recipekithub.model.vo.GoogleOAuthRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;

/*
	1. application.properties에 등록한 구글 변수들을 받아왔다. 롬복으로 저장
	2. 서버가 실행이 된 후, 브라우저에서 http://localhost:7777/login/getGoogleAuthUrl 를 입력한다.
	3. ApiRestController 안의 getGoogleAuthUrl 로 진입하여 구글 OAth 주소를 만들어 구글 로그인 창으로 리다이렉션 시킨다.
	4. 유저가 구글 로그인을 하고 확인을 클릭하면, 미리약속된 레드망고 서비스의 리다이렉션 주소 /login/oauth_google_check 즉, ApiRestController 의 oauth_google_check 메서드로 진입 하게 된다. 로그인이 정상이라면 authCode를 갖고 진입.
	5. 소스상 3번 이며, oauth_google_check에서는 authCode와 application.properties에 정의된 변수들을 갖고 GoogleOAuthRequest 객체를 생성한다. 이 객체를 구글에 보내고 결과로 토큰을 받는다.
	6. 받은 토큰을 갖고 다시 구글에 유저정보를 요청한다. 소스 5번 부분
	7. 소스상 6번 부분으로 토큰에 해당하는 유저의 정보를 받게 되며 구글과의 통신 작업은 끝이 난다.
*/

@Slf4j
@RestController
public class ApiRestController {

	@Value("${google.auth.url}")
	private String googleAuthUrl;

	@Value("${google.login.url}")
	private String googleLoginUrl;

	@Value("${google.client.id}")
	private String googleClientId;

	@Value("${google.redirect.url}")
	private String googleRedirectUrl;

	@Value("${google.secret}")
	private String googleClientSecret;

	// 구글 로그인창 호출
	// 단순히 브라우저에서 call 하면 구글 로그인 페이지로 연결. 구글에서 보내온 주소로 리다이렉션
	// http://localhost:7777
	@GetMapping(value = "/login/getGoogleAuthUrl")
	public ResponseEntity<?> getGoogleAuthUrl(HttpServletRequest request) throws Exception {

		String reqUrl = googleLoginUrl + "/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri="
				+ googleRedirectUrl + "&response_type=code&scope=email%20profile%20openid&access_type=offline";

		log.info("myLog-LoginUrl : {}", googleLoginUrl);
		log.info("myLog-ClientId : {}", googleClientId);
		log.info("myLog-RedirectUrl : {}", googleRedirectUrl);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(URI.create(reqUrl));

		// 1. reqUrl 구글로그인 창을 띄우고, 로그인 후 /login/oauth_google_check 으로 리다이렉션하게 한다.
		return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
	}

	
	// 구글에서 리다이렉션
	// 구글에게 토큰을 요청해서 받고, 받은 토큰을 다시 보내 유저 정보를 얻는 기능을 한다.
	@GetMapping(value = "/login/oauth_google_check")
	public String oauth_google_check(HttpServletRequest request, @RequestParam(value = "code") String authCode, HttpServletResponse response) throws Exception {

		// 2.구글에 등록된 레드망고 설정정보를 보내어 약속된 토큰을 받위한 객체 생성
		GoogleOAuthRequest googleOAuthRequest = GoogleOAuthRequest.builder().clientId(googleClientId)
				.clientSecret(googleClientSecret).code(authCode).redirectUri(googleRedirectUrl)
				.grantType("authorization_code").build();

		RestTemplate restTemplate = new RestTemplate();

		// 3.토큰요청을 한다.
		ResponseEntity<GoogleLoginResponse> apiResponse = restTemplate.postForEntity(googleAuthUrl + "/token",	googleOAuthRequest, GoogleLoginResponse.class);
		
		// 4.받은 토큰을 토큰객체에 저장
		GoogleLoginResponse googleLoginResponse = apiResponse.getBody();

		log.info("responseBody {}", googleLoginResponse.toString());

		String googleToken = googleLoginResponse.getIdToken();

		// 5.받은 토큰을 구글에 보내 유저정보를 얻는다.
		String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo").queryParam("id_token", googleToken).toUriString();

		// 6.허가된 토큰의 유저정보를 결과로 받는다.
		String resultJson = restTemplate.getForObject(requestUrl, String.class);

		return resultJson;
	}
}